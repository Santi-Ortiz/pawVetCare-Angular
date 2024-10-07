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
  @Input() mascota: any;  
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

        this.mascotasService.actualizarMascotaAdmin(mascotaActualizada.id, mascotaActualizada).subscribe(
          response => {
            console.log('Mascota actualizada con éxito:', response);
            alert('Mascota actualizada correctamente');
            this.router.navigate(['/mascotas/todas']);  
          },
          error => {
            console.error('Error al actualizar la mascota:', error);
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.');
          }
        );
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
    
    
    if (botonEliminar?.classList.contains('expanded')) {
      if (this.mascota && this.mascota.id !== undefined) {
       
        this.mascotasService.eliminarMascotaAdmin(this.mascota.id).subscribe(
          response => {
            console.log('Mascota eliminada:', this.mascota?.id);
            alert('Mascota eliminada exitosamente');
            this.router.navigate(['/mascotas/todas']);  
          },
          error => {
            console.error('Error al eliminar la mascota:', error);
            alert('Hubo un error al eliminar la mascota. Inténtalo nuevamente más tarde.');
          }
        );
      } else {
        console.log('Error: No se pudo eliminar la mascota');
        alert('Error: No se encontró la mascota para eliminar.');
      }
    } else {
      
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }
  
}
