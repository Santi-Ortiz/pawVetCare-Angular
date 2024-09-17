import { Component, Input } from '@angular/core';
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
    cliente: 0,
    tratamientos: [],
  };

  constructor(private mascotasService: MascotasService) {}

  agregarMascota(): void {
    this.mascotasService.agregarMascota(this.nuevaMascota);
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
      cliente: 0,
      tratamientos: [],
    };
  }
}
