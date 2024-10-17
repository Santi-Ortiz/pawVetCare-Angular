import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../model/mascota';
import { AuthService } from 'src/app/services/auth.service';
import { Medicamento } from 'src/app/model/medicamento';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { Tratamiento } from 'src/app/model/tratamiento';
import { TratamientoService } from 'src/app/services/tratamiento.service';

@Component({
  selector: 'app-ver-una-mascota',
  templateUrl: './ver-una-mascota.component.html',
  styleUrls: ['./ver-una-mascota.component.css']
})
export class VerUnaMascotaComponent implements OnInit {

  // Define el tipo de usuario actual
  userType: string | null | undefined;
  tratamientos: Tratamiento[] = [];
  // Formulario para manejar la edición de la información de la mascota
  mascotaForm: FormGroup;
  isEditMode: boolean = false;  // Controla si estamos en modo de edición

  // Objeto para almacenar la información de la mascota actual
  mascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: '',
    estado: true,
    cedulaCliente: 0,
    tratamientos: [],
  }

  // Accedemos al carrusel en la plantilla HTML mediante ViewChild
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  // Inyectamos los servicios necesarios para obtener medicamentos y la navegación
  constructor(
    private mascotaService: MascotasService, 
  
    private fb: FormBuilder,  // Inyecta el servicio FormBuilder para manejar formularios
    private route: ActivatedRoute, // Inyecta la ruta activa para obtener parámetros de la URL
    private router: Router,  // Inyecta el enrutador para redirigir a otras páginas
    private mascotasService: MascotasService,  // Inyecta el servicio de mascotas para operaciones con API
    private authService: AuthService,  // Inyecta el servicio de autenticación para obtener el rol del usuario
  ) {

    // Inicializa el formulario con campos vacíos
    this.mascotaForm = this.fb.group({
      nombre: [''],
      raza: [''],
      edad: [''],
      peso: [''],
      enfermedad: [''],
      cliente: [''],
      estado: [''],
      foto: ['']
    });

    // Escucha los cambios en el campo "estado" del formulario y los refleja en el objeto "mascota"
    this.mascotaForm.get('estado')?.valueChanges.subscribe((nuevoEstado: boolean) => {
      this.mascota.estado = nuevoEstado;
    });
  }

  ngOnInit(): void {
    // Obtenemos todos los medicamentos y los asignamos al arreglo 'medicamentos'
    this.mascotaService.obtenerTratamientosPorMascotaId(this.mascota.id).subscribe((tratamientos: Tratamiento[]) => {
      this.tratamientos = tratamientos; // Asignamos los medicamentos obtenidos
    });

    // Obtiene el rol del usuario actual (admin, vet o cliente)
    this.userType = this.authService.getUserRole(); 
    
    // Obtiene el ID de la mascota desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    // Si no hay un ID válido, muestra una alerta
    if (!id) {
      alert('ID de mascota inválido.');
      return;
    }
  
    // Llama al servicio para obtener los detalles de la mascota por ID
    this.mascotasService.obtenerMascotaPorId(id).subscribe(
      (mascota: Mascota) => {
        this.mascota = mascota;
        console.log(mascota);
  
        // Inicializa el formulario con los datos de la mascota obtenidos
        this.mascotaForm.patchValue({
          nombre: this.mascota.nombre,
          raza: this.mascota.raza,
          edad: this.mascota.edad,
          peso: this.mascota.peso,
          enfermedad: this.mascota.enfermedad,
          cliente: this.mascota.cedulaCliente,
          estado: this.mascota.estado,
          foto: this.mascota.foto
        });
  
        // Desactiva el formulario para evitar cambios no autorizados
        this.mascotaForm.disable();
      },
      (error) => {
        console.error(`Error al obtener la mascota con ID ${id}:`, error);
        alert(`Mascota con ID ${id} no encontrada`);
      }
    );
  }

  // Función que alterna entre el modo de edición y el modo de visualización
  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn');
    this.isEditMode = !this.isEditMode;
  
    // Si estamos en modo de edición, habilita el formulario
    if (this.isEditMode) {
      this.mascotaForm.enable();
      if (botonEditar) {
        botonEditar.classList.add('expanded');
        botonEditar.innerHTML = "<span class='text'>Guardar</span>";
      }
      console.log('Formulario habilitado para edición');
    } else {
      // Si salimos del modo de edición, actualiza los datos de la mascota
      const mascotaActualizada: Mascota = {
        ...this.mascota,
        ...this.mascotaForm.value,
        estado: this.mascotaForm.get('estado')?.value === 'true' || this.mascotaForm.get('estado')?.value === true
      };
  
      // Verifica si la mascota tiene un ID válido antes de proceder
      if (!mascotaActualizada.id) {
        alert('ID de la mascota no está definido.');
        return;
      }
  
      // Llama a los métodos del servicio según el tipo de usuario (admin o vet) para actualizar la mascota
      if (this.userType === 'admin') {
        this.mascotasService.actualizarMascotaAdmin(mascotaActualizada.id, mascotaActualizada).subscribe(
          response => {
            console.log('Mascota actualizada por el administrador:', response);
            this.router.navigate(['/mascotas/todas']);  // Redirige a la lista de mascotas
          },
          error => {
            console.error('Error al actualizar la mascota (admin):', error);
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.');
          },
          () => {
            this.finalizeEditMode(botonEditar);  // Finaliza el modo de edición
          }
        );
      } else if (this.userType === 'vet') {
        this.mascotasService.actualizarMascotaVet(mascotaActualizada.id, mascotaActualizada).subscribe(
          response => {
            console.log('Mascota actualizada por el veterinario:', response);
            this.router.navigate(['/mascotas/todas']);  // Redirige a la lista de mascotas
          },
          error => {
            console.error('Error al actualizar la mascota (vet):', error);
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.');
          },
          () => {
            this.finalizeEditMode(botonEditar);  // Finaliza el modo de edición
          }
        );
      }
    }
  }
  
  // Finaliza el modo de edición, deshabilitando el formulario y restaurando el botón de edición
  finalizeEditMode(botonEditar: HTMLElement | null): void {
    this.isEditMode = false;
    this.mascotaForm.disable();
    if (botonEditar) {
      botonEditar.classList.remove('expanded');
      botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>";
    }
  }

  // Función que alterna entre expandir y eliminar la mascota
  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn');
    
    // Si el botón de eliminar ya está expandido, procede a eliminar la mascota
    if (botonEliminar?.classList.contains('expanded')) {
      if (this.userType === 'admin' && this.mascota.id !== undefined) {
        this.mascotasService.eliminarMascotaAdmin(this.mascota.id);  // Elimina la mascota como administrador
        console.log('Mascota eliminada:', this.mascota.id);
        this.router.navigate(['/mascotas/todas']);  // Redirige a la lista de mascotas
      } else if (this.userType === 'vet' && this.mascota.id !== undefined) {
        this.mascotasService.eliminarMascotaVet(this.mascota.id);  // Elimina la mascota como veterinario
        console.log('Mascota eliminada:', this.mascota.id);
        this.router.navigate(['/mascotas/todas']);  // Redirige a la lista de mascotas
      } else {
        console.log('Error: No se pudo eliminar la mascota');
      }
    } else {
      // Si el botón no está expandido, lo expande para confirmar la eliminación
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }

}
