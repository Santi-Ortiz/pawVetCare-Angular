import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { VeterinarioService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-informacion-veterinario',
  templateUrl: './informacion-veterinario.component.html',
  styleUrls: ['./informacion-veterinario.component.css']
})
export class InformacionVeterinarioComponent {
  userType = 'admin';

  @Input()
  veterinarioForm!: FormGroup;
  @Input() veterinario: any;  
  @Input()
  isEditMode!: boolean;

  constructor(
    private fb: FormBuilder,  
    private route: ActivatedRoute, 
    private router: Router,
    private veterinarioService: VeterinarioService  
  ) {

    this.veterinarioForm = this.fb.group({
      nombre: [''],
      cedula: [''],
      contrasena: [''],
      foto: [''],
      especialidad: [''],
      tratamientos: ['']
    });

  }

  ngOnInit(): void {
    if (this.veterinario) {
      this.veterinarioForm.patchValue(this.veterinario);
    }
  }

  

  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn');
    this.isEditMode = !this.isEditMode;
  
    if (this.isEditMode) {

      this.veterinarioForm.enable();
      if (botonEditar) {
        botonEditar.classList.add('expanded');
        botonEditar.innerHTML = "<span class='text'>Guardar</span>";
      }
      console.log('Formulario habilitado para edición');
    } else {

      const veterinarioActualizado: Veterinario = {
        ...this.veterinario,
        ...this.veterinarioForm.value,
      };
  
      if (this.veterinario) {

        this.veterinarioService.updateVeterinario(this.veterinario.id, veterinarioActualizado).subscribe(
          (response: String) => {
            console.log('Veterinario actualizado correctamente', response);
            this.router.navigate(['/veterinarios/todos']);
          },
          (error) => {
            console.error('Error al actualizar el veterinario:', error);
            alert('Hubo un error al actualizar el veterinario. Inténtalo nuevamente más tarde.');
          }
        );
      }
  
  
      this.veterinarioForm.disable();
      if (botonEditar) {
        botonEditar.classList.remove('expanded');
        botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>";
      }
    }
  }
  

  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn');
    
    
    if (botonEliminar?.classList.contains('expanded')) {
      if (this.veterinario && this.veterinario.id !== undefined) {
       
        this.veterinarioService.deleteVeterinario(this.veterinario.cedula).subscribe(
          (response) => {
            console.log('Veterinario eliminado:', this.veterinario?.cedula);
            console.log('Veterinario actualizado correctamente', response);
            alert('Veterinario eliminado exitosamente');
            this.router.navigate(['/veterinarios/todos']);  
          },
          error => {
            console.error('Error al eliminar el veterinario:', error);
            alert('Hubo un error al eliminar el veterinario. Inténtalo nuevamente más tarde.');
          }
        );
      } else {
        console.log('Error: No se pudo eliminar  el veterinario');
        alert('Error: No se encontró el veterinario para eliminar.');
      }
    } else {
      
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }
  
}
