import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { VeterinarioService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-ver-un-veterinario',
  templateUrl: './ver-un-veterinario.component.html',
  styleUrls: ['./ver-un-veterinario.component.css']
})
export class VerUnVeterinarioComponent {
  userType = 'admin';

  veterinarioForm: FormGroup;
  isEditMode: boolean = false;

  veterinario: Veterinario = {
    id: 0,
    cedula: 0,
    contrasena: '',
    foto: '',
    nombre: '',
    especialidad: {
      id: 0,
      nombreEspecialidad: '',
    },
    tratamientos: [],
  }

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
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.veterinarioService.getVeterinarioByCedula(id).subscribe((veterinario: Veterinario) => {
      this.veterinario = veterinario;
      this.veterinarioForm.patchValue({
        nombre: this.veterinario.nombre,
        cedula: this.veterinario.cedula,
        contrasena: this.veterinario.contrasena,
        foto: this.veterinario.foto,
        especialidad: this.veterinario.especialidad,
        tratamientos: this.veterinario.tratamientos
      });
      this.veterinarioForm.disable();
    }, () => {
      this.veterinario = {
        id: 0,
        cedula: 0,
        contrasena: '',
        foto: '',
        nombre: '',
        especialidad: {
          id: 0,
          nombreEspecialidad: '',
        },
        tratamientos: [],
      };
    });
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
        ...this.veterinarioForm.value
      };

      if (this.veterinario) {
          this.veterinarioService.updateVeterinario(veterinarioActualizado.id, veterinarioActualizado).subscribe(response => {
            console.log('Veterinario actualizado:', response);
          }, error => {
            console.error('Error al actualizar el veterinario:', error);
          });     
        console.log('Veterinario actualizado:', veterinarioActualizado);
        this.router.navigate(['/veterinario/todos']); 
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
    
          this.veterinarioService.deleteVeterinario(this.veterinario.id).subscribe(
            response => {
              console.log('Mascota eliminada por el admin:', response);
              this.router.navigate(['/veterinario/todos']);  
            },
            error => {
              console.error('Error al eliminar el veterinario:', error);
            }
          );
      } else {
        console.log('Error: No se pudo eliminar el veterinario');
      }
    } else {
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }
  
}
