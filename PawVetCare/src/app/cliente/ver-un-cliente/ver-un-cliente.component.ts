import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-ver-un-cliente',
  templateUrl: './ver-un-cliente.component.html',
  styleUrls: ['./ver-un-cliente.component.css']
})
export class VerUnClienteComponent {
  userType = 'admin';
  mascotaId: number | undefined;
  index = 0;
  intervalId: any;
  mascotas: Mascota[] = [];

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

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

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
    this.mascotas = this.mascotasService.getMascotas();
    //console.log(this.mascotas);
    this.autoMoverCarrusel();
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
   
    this.mascota = this.mascotasService.getMascota(id) || {
      id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      enfermedad: '',
      foto: '',
      estado: true,  // Valor por defecto
      cliente: 0,
      tratamientos: []
    };
    
    if (this.mascota) {
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
    }
    this.mascotaForm.disable();
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

      if (this.mascota) {
        this.mascotasService.actualizarMascota(mascotaActualizada.id, mascotaActualizada);
        console.log('Mascota actualizada:', mascotaActualizada);
        this.router.navigate(['/mascotas']); 
      }

      this.mascotaForm.disable();  
      if (botonEditar) {
        botonEditar.classList.remove('expanded');
        botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>";
      }
    }
  }

  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn');
    // Si el botón ya está expandido, procede a eliminar la mascota
    if (botonEliminar?.classList.contains('expanded')) {
      if (this.mascota && this.mascota.id !== undefined) {
        this.mascotasService.eliminarMascota(this.mascota.id);  // Eliminar la mascota por ID
        console.log('Mascota eliminada:', this.mascota.id);
        this.router.navigate(['/mascotas']);  // Redirigir a la lista de mascotas
      } else {
        console.log('Error: No se pudo eliminar la mascota');
      }
    } else {
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cambiarMascota(direccion: number): void {
    const totalMascotas = this.mascotas.length;
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; 
    console.log(`Mostrando mascota en índice: ${this.index}`); 
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000);
  }
  
}
