import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css']
})
export class InformacionMascotaComponent {
  // Define el tipo de usuario, en este caso, 'admin'
  userType = 'admin';

  // Inputs recibidos del componente padre
  @Input()
  mascotaForm!: FormGroup;  // Formulario reactivo que contiene la información de la mascota
  @Input() mascota: any;  // Variable que contiene la información de la mascota
  @Input()
  isEditMode!: boolean;  // Variable para gestionar el estado de edición del formulario

  constructor(
    private fb: FormBuilder,  // Servicio para construir formularios
    private route: ActivatedRoute,  // Para obtener parámetros de la URL
    private router: Router,  // Para navegar entre diferentes rutas
    private mascotasService: MascotasService  // Servicio para manejar operaciones CRUD de mascotas
  ) {

    // Inicialización del formulario de la mascota con valores vacíos
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

    // Detectar cambios en el campo 'estado' del formulario y actualizar el objeto mascota
    this.mascotaForm.get('estado')?.valueChanges.subscribe((nuevoEstado: boolean) => {
      this.mascota.estado = nuevoEstado;
    });
  }

  // Método para alternar entre el modo de edición y guardar
  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn');  // Obtener el botón de editar
    this.isEditMode = !this.isEditMode;  // Cambiar el estado de edición
  
    if (this.isEditMode) {
      // Habilitar el formulario para edición
      this.mascotaForm.enable();
      if (botonEditar) {
        botonEditar.classList.add('expanded');  // Cambiar el estilo del botón
        botonEditar.innerHTML = "<span class='text'>Guardar</span>";  // Actualizar el texto del botón
      }
      console.log('Formulario habilitado para edición');
    } else {
      // Crear un objeto con los datos actualizados de la mascota
      const mascotaActualizada = {
        ...this.mascota,
        ...this.mascotaForm.value,
        estado: this.mascotaForm.get('estado')?.value === 'true' || this.mascotaForm.get('estado')?.value === true
      };
  
      if (this.mascota) {
        // Llamar al servicio para actualizar la mascota en el servidor
        this.mascotasService.actualizarMascotaAdmin(mascotaActualizada.id, mascotaActualizada).subscribe(
          response => {
            console.log('Mascota actualizada con éxito:', response);
            alert('Mascota actualizada correctamente');
            this.router.navigate(['/mascotas/todas']);  // Redirigir a la página de todas las mascotas
          },
          error => {
            console.error('Error al actualizar la mascota:', error);
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.');
          }
        );
      }
  
      // Deshabilitar el formulario después de guardar los cambios
      this.mascotaForm.disable();
      if (botonEditar) {
        botonEditar.classList.remove('expanded');  // Revertir el estilo del botón
        botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>";  // Restaurar el texto original del botón
      }
    }
  }
  
  // Método para eliminar la mascota
  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn');  // Obtener el botón de eliminar
    
    if (botonEliminar?.classList.contains('expanded')) {
      // Comprobar si la mascota tiene un ID válido para proceder con la eliminación
      if (this.mascota && this.mascota.id !== undefined) {
        // Llamar al servicio para eliminar la mascota
        this.mascotasService.eliminarMascotaAdmin(this.mascota.id).subscribe(
          response => {
            console.log('Mascota eliminada:', this.mascota?.id);
            alert('Mascota eliminada exitosamente');
            this.router.navigate(['/mascotas/todas']);  // Redirigir a la página de todas las mascotas
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
      // Expandir el botón de eliminar para confirmar la acción
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }
}