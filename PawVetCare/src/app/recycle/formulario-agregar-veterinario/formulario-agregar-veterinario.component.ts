import { Component, Input } from '@angular/core';
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
    especialidad: { 
      id: 0,
      nombreEspecialidad: '',
    },
    tratamientos: [],
  }

  constructor(private veterinarioService: VeterinarioService, private router: Router) {}

  agregarVeterinario(): void {
    
    this.veterinarioService.addVeterinario(this.nuevoVeterinario, this.nuevoVeterinario.cedula).subscribe(
      response => {
        alert('Veterinario agregado exitosamente');
       
        this.nuevoVeterinario = {
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
  
       
        this.router.navigate(['/veterinario/todos']);
      },
      error => {
        console.error('Error al agregar el veterinario:', error);
        alert('Ocurrió un error al agregar el veterinario. Inténtalo nuevamente.');
      }
    );
  }
  
}
