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
  mascota: Mascota | undefined;
  isEditMode: boolean = false;

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
  }

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
   
    this.mascota = this.mascotasService.getMascota(id);
    
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
    this.isEditMode = !this.isEditMode;  

    if (this.isEditMode) {
     
      this.mascotaForm.enable();
      console.log('Formulario habilitado para edición');
    } else {
      
      const mascotaActualizada: Mascota = {
        ...this.mascota,  
        ...this.mascotaForm.value 
      };

      if (this.mascota) {
        this.mascotasService.actualizarMascota(mascotaActualizada.id, mascotaActualizada);
        console.log('Mascota actualizada:', mascotaActualizada);
        this.router.navigate(['/mascotas']); 
      }

      this.mascotaForm.disable();  
    }
  }

  toggleEliminar(): void {
    if (this.mascota && this.mascota.id !== undefined) {
      this.mascotasService.eliminarMascota(this.mascota.id);  // Eliminar la mascota por ID
      console.log('Mascota eliminada:', this.mascota.id);
      this.router.navigate(['/mascotas']);  // Redirigir a la lista de mascotas
    } else {
      console.log('Error: No se pudo eliminar la mascota');
    }
  }

}
