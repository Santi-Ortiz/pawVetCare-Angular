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