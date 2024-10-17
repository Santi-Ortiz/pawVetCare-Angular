// Importaciones necesarias desde Angular y otros módulos.
import { Component, Input } from '@angular/core'; // Importa Component y Input para definir el componente y recibir datos.
import { Router } from '@angular/router'; // Importa Router para la navegación entre rutas.
import { Veterinario } from 'src/app/model/veterinario'; // Importa el modelo Veterinario.
import { VeterinarioService } from 'src/app/services/vet.service'; // Importa el servicio VeterinarioService para manejar operaciones relacionadas con veterinarios.

@Component({
  selector: 'app-formulario-agregar-veterinario', // Selector que se utiliza para identificar el componente en el HTML.
  templateUrl: './formulario-agregar-veterinario.component.html', // Ruta al archivo de plantilla HTML del componente.
  styleUrls: ['./formulario-agregar-veterinario.component.css'] // Rutas a los estilos CSS del componente.
})
export class FormularioAgregarVeterinarioComponent {
  @Input() nuevoVeterinario: Veterinario = { // Define una propiedad 'nuevoVeterinario' que puede recibir datos de un componente padre.
    id: 0, // ID inicial del veterinario (se asigna 0 como valor predeterminado).
    cedula: 0, // Cédula inicial del veterinario.
    contrasena: '', // Contraseña inicial del veterinario.
    foto: '', // URL de la foto inicial del veterinario.
    nombre: '', // Nombre inicial del veterinario.
    estado: false, // Estado inicial del veterinario (inactivo por defecto).
    nombreEspecialidad: '',
    tratamientos: [], // Lista de tratamientos inicial (vacía por defecto).
  }

  // Constructor del componente, inyecta el servicio de veterinarios y el router para la navegación.
  constructor(private veterinarioService: VeterinarioService, private router: Router) {}

  // Método que se llama para agregar un nuevo veterinario.
  agregarVeterinario(): void {
    // Llama al método addVeterinario del servicio veterinario, pasando el nuevo veterinario y su cédula.
    this.veterinarioService.addVeterinario(this.nuevoVeterinario, this.nuevoVeterinario.cedula).subscribe(
      response => {
        // Si la operación es exitosa, muestra una alerta al usuario.
        alert('Veterinario agregado exitosamente');
        
        // Reinicia el objeto nuevoVeterinario a su estado inicial después de agregarlo.
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

        // Navega a la ruta '/veterinarios/todos' para mostrar la lista de veterinarios.
        this.router.navigate(['/veterinarios/todos']);
      },
      error => {
        // Si hay un error al agregar el veterinario, se captura y se muestra un mensaje de error.
        console.error('Error al agregar el veterinario:', error);
        alert('Ocurrió un error al agregar el veterinario. Inténtalo nuevamente.');
      }
    );
  }
}
