import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css']
})
export class InformacionMascotaComponent {
  @Input()
  mascotaForm!: FormGroup;
  @Input() mascota: any;  // Ajusta el tipo según la estructura de tu mascota
  @Input()
  isEditMode!: boolean;

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
        // Llama al servicio para actualizar la mascota
        console.log('Mascota actualizada:', mascotaActualizada);
        // Navega a la página de mascotas o maneja el flujo según sea necesario
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
      if (this.mascota) {
        // Llama al servicio para eliminar la mascota
        console.log('Mascota eliminada:', this.mascota);
        // Navega a la página de mascotas o maneja el flujo según sea necesario
      }
    } else {
      botonEliminar?.classList.add('expanded');
    }
  }
}
