import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-informacion-veterinario',
  templateUrl: './informacion-veterinario.component.html',
  styleUrls: ['./informacion-veterinario.component.css']
})
export class InformacionVeterinarioComponent {
  userType = 'admin';

  @Input()
  mascotaForm!: FormGroup;
  @Input() mascota: any;  // Ajusta el tipo según la estructura de tu mascota
  @Input()
  isEditMode!: boolean;

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
      const mascotaActualizada = {
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
}
