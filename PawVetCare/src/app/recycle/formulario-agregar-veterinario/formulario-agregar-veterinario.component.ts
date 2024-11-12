import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { VeterinarioService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-formulario-agregar-veterinario',
  templateUrl: './formulario-agregar-veterinario.component.html',
  styleUrls: ['./formulario-agregar-veterinario.component.css']
})
export class FormularioAgregarVeterinarioComponent {
  especialidades = [
    { ID: 1, NOMBRE_ESPECIALIDAD: 'Cardiología' },
    { ID: 3, NOMBRE_ESPECIALIDAD: 'Dermatología' },
    { ID: 7, NOMBRE_ESPECIALIDAD: 'Neurología' },
    { ID: 2, NOMBRE_ESPECIALIDAD: 'Nutrición' },
    { ID: 4, NOMBRE_ESPECIALIDAD: 'Oncología' },
    { ID: 6, NOMBRE_ESPECIALIDAD: 'Parasitología' },
    { ID: 5, NOMBRE_ESPECIALIDAD: 'Toxicología' },
    { ID: 8, NOMBRE_ESPECIALIDAD: 'Cirugía' }
  ];
  
  @Input() nuevoVeterinario: Veterinario = {
    id: 0,
    cedula: 0,
    contrasena: '',
    foto: '',
    nombre: '',
    estado: false,
    nombreEspecialidad: '',
    tratamientos: [],
  };

  constructor(private veterinarioService: VeterinarioService, private router: Router) {}

  agregarVeterinario(form: NgForm): void {
    if (form.valid) {
      this.veterinarioService.addVeterinario(this.nuevoVeterinario, this.nuevoVeterinario.cedula).subscribe(
        response => {
          alert('Veterinario agregado exitosamente');
          this.nuevoVeterinario = {
            id: 0,
            cedula: 0,
            contrasena: '',
            foto: '',
            nombre: '',
            estado: false,
            nombreEspecialidad: '',
            tratamientos: [],
          };
          this.router.navigate(['/veterinarios/todos']);
        },
        error => {
          console.error('Error al agregar el veterinario:', error);
          alert('Ocurrió un error al agregar el veterinario. Inténtalo nuevamente.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}