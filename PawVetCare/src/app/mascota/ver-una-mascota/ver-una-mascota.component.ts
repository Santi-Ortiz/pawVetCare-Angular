import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../model/mascota';


@Component({
  selector: 'app-ver-una-mascota',
  templateUrl: './ver-una-mascota.component.html',
  styleUrls: ['./ver-una-mascota.component.css']
})

export class VerUnaMascotaComponent {
  
  userType = 'admin';

  mascotaForm: FormGroup;
  isEditMode: boolean = false;

  mascota: Mascota = {
    id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      enfermedad: '',
      foto: '',
      estado: true,
      cliente: 0,
      tratamientos: [],
  }

  constructor(
    private fb: FormBuilder,  
    private route: ActivatedRoute, 
    private router: Router,
    private mascotasService: MascotasService  
  ) {

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

    // Escuchar los cambios en el formulario y actualizar el objeto mascota
    this.mascotaForm.get('estado')?.valueChanges.subscribe((nuevoEstado: boolean) => {
      this.mascota.estado = nuevoEstado;
    });

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    
    if (!id) {
      alert('ID de mascota inválido.');
      return;
    }
  
    this.mascotasService.obtenerMascotaPorId(id).subscribe(
      (mascota: Mascota) => {
  
        this.mascota = mascota;
  
      
        this.mascotaForm.patchValue({
          nombre: this.mascota.nombre,
          raza: this.mascota.raza,
          edad: this.mascota.edad,
          peso: this.mascota.peso,
          enfermedad: this.mascota.enfermedad,
          cliente: this.mascota.cliente,
          estado: this.mascota.estado,
          foto: this.mascota.foto
        });
  
        this.mascotaForm.disable();
      },
      (error) => {
        console.error(`Error al obtener la mascota con ID ${id}:`, error);
        alert(`Mascota con ID ${id} no encontrada`);
      }
    );
  }
  

  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn');
    this.isEditMode = !this.isEditMode;
  
    if (this.isEditMode) {
      this.mascotaForm.enable();
      if (botonEditar) {
        botonEditar.classList.add('expanded');
        botonEditar.innerHTML = "<span class='text'>Guardar</span>";
      }
      console.log('Formulario habilitado para edición');
    } else {
      const mascotaActualizada: Mascota = {
        ...this.mascota,
        ...this.mascotaForm.value,
        estado: this.mascotaForm.get('estado')?.value === 'true' || this.mascotaForm.get('estado')?.value === true
      };
  
     
      if (!mascotaActualizada.id) {
        alert('ID de la mascota no está definido.');
        return;
      }
  

      if (this.userType === 'admin') {
        this.mascotasService.actualizarMascotaAdmin(mascotaActualizada.id, mascotaActualizada).subscribe(
          response => {
            console.log('Mascota actualizada por el administrador:', response);
            this.router.navigate(['/mascotas/todas']);
          },
          error => {
            console.error('Error al actualizar la mascota (admin):', error);
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.');
          },
          () => {
            this.finalizeEditMode(botonEditar);  
          }
        );
      } else if (this.userType === 'vet') {
        this.mascotasService.actualizarMascotaVet(mascotaActualizada.id, mascotaActualizada).subscribe(
          response => {
            console.log('Mascota actualizada por el veterinario:', response);
            this.router.navigate(['/mascotas/todas']);
          },
          error => {
            console.error('Error al actualizar la mascota (vet):', error);
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.');
          },
          () => {
            this.finalizeEditMode(botonEditar);  
          }
        );
      }
    }
  }
  
  finalizeEditMode(botonEditar: HTMLElement | null): void {
    this.isEditMode = false;
    this.mascotaForm.disable();
    if (botonEditar) {
      botonEditar.classList.remove('expanded');
      botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>";
    }
  }
  
  

  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn');
    // Si el botón ya está expandido, procede a eliminar la mascota
    if (botonEliminar?.classList.contains('expanded')) {
      if (this.userType === 'admin' && this.mascota.id !== undefined) {
        this.mascotasService.eliminarMascotaAdmin(this.mascota.id);  // Eliminar la mascota por ID
        console.log('Mascota eliminada:', this.mascota.id);
        this.router.navigate(['/mascotas/todas']);  // Redirigir a la lista de mascotas
      } else if(this.userType === 'admin' && this.mascota.id !== undefined){
        this.mascotasService.eliminarMascotaVet(this.mascota.id);  // Eliminar la mascota por ID
        console.log('Mascota eliminada:', this.mascota.id);
        this.router.navigate(['/mascotas/todas']);  // Redirigir a la lista de mascotas
      } else {
        console.log('Error: No se pudo eliminar la mascota');
      }
    } else {
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }

}
