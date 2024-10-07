import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-ver-un-veterinario',
  templateUrl: './ver-un-veterinario.component.html',
  styleUrls: ['./ver-un-veterinario.component.css']
})
export class VerUnVeterinarioComponent {
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

    this.mascotasService.obtenerMascotaPorId(id).subscribe((mascota: Mascota) => {
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
    }, () => {
      this.mascota = {
        id: 0,
        nombre: '',
        raza: '',
        edad: 0,
        peso: 0,
        enfermedad: '',
        foto: '',
        estado: true,  
        cliente: 0,
        tratamientos: []
      };
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
      
      const mascotaActualizada: Mascota = {
        ...this.mascota,  
        ...this.mascotaForm.value, 
        estado: this.mascotaForm.get('estado')?.value === 'true' || this.mascotaForm.get('estado')?.value === true
      };

      if (this.mascota) {
        if (this.userType === 'admin') {
          this.mascotasService.actualizarMascotaAdmin(mascotaActualizada.id, mascotaActualizada).subscribe(response => {
            console.log('Mascota actualizada por el administrador:', response);
            // Aquí puedes agregar cualquier lógica adicional, como mostrar una notificación
          }, error => {
            console.error('Error al actualizar la mascota (admin):', error);
            // Manejo de errores
          });
        } else if (this.userType === 'vet') {
          this.mascotasService.actualizarMascotaVet(mascotaActualizada.id, mascotaActualizada).subscribe(response => {
            console.log('Mascota actualizada por el veterinario:', response);
            // Aquí puedes agregar cualquier lógica adicional, como mostrar una notificación
          }, error => {
            console.error('Error al actualizar la mascota (vet):', error);
            // Manejo de errores
          });
        }        
        console.log('Mascota actualizada:', mascotaActualizada);
        this.router.navigate(['/mascotas/todas']); 
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
    
        if (this.userType === 'admin') {
          this.mascotasService.eliminarMascotaAdmin(this.mascota.id).subscribe(
            response => {
              console.log('Mascota eliminada por el admin:', response);
              this.router.navigate(['/mascotas/todas']);  
            },
            error => {
              console.error('Error al eliminar la mascota (admin):', error);
            }
          );
        } else if (this.userType === 'vet') {
          this.mascotasService.eliminarMascotaVet(this.mascota.id).subscribe(
            response => {
              console.log('Mascota eliminada por el veterinario:', response);
              this.router.navigate(['/mascotas/todas']); 
            },
            error => {
              console.error('Error al eliminar la mascota (vet):', error);
            }
          );
        }
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
