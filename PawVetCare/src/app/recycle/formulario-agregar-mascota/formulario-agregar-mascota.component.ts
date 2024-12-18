import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-formulario-agregar-mascota',
  templateUrl: './formulario-agregar-mascota.component.html',
  styleUrls: ['./formulario-agregar-mascota.component.css']
})
export class FormularioAgregarMascotaComponent {
  @Input() nuevaMascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: '',
    estado: true,
    cedulaCliente: 0,
    tratamientos: [],
  };

  constructor(private mascotasService: MascotasService, private router: Router) {}

  agregarMascota(form: NgForm): void {
    if (form.valid) {
      this.mascotasService.agregarMascotaAdmin(this.nuevaMascota, this.nuevaMascota.cedulaCliente).subscribe(
        response => {
          alert('Mascota agregada exitosamente');
          this.nuevaMascota = {
            id: 0,
            nombre: '',
            raza: '',
            edad: 0,
            peso: 0,
            enfermedad: '',
            foto: '',
            estado: true,
            cedulaCliente: 0,
            tratamientos: [],
          };
          this.router.navigate(['/mascotas/todas']);
        },
        error => {
          console.error('Error al agregar la mascota:', error);
          alert('Ocurrió un error al agregar la mascota. Inténtalo nuevamente.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}