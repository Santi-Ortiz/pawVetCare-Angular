import { Component, Input } from '@angular/core'; // Importa los decoradores Component e Input de Angular core.
import { Router } from '@angular/router'; // Importa Router para manejar la navegación entre rutas.
import { Mascota } from 'src/app/model/mascota'; // Importa la interfaz Mascota que define la estructura de los datos de una mascota.
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio para gestionar las mascotas.

@Component({
  selector: 'app-formulario-agregar-mascota', // Define el selector del componente que se usará en las plantillas.
  templateUrl: './formulario-agregar-mascota.component.html', // Especifica el archivo HTML asociado al componente.
  styleUrls: ['./formulario-agregar-mascota.component.css'] // Especifica el archivo CSS asociado al componente.
})
export class FormularioAgregarMascotaComponent {
  // Define una propiedad de entrada que permite recibir datos desde un componente padre.
  @Input() nuevaMascota: Mascota = {
    id: 0, // ID inicial de la mascota.
    nombre: '', // Nombre de la mascota.
    raza: '', // Raza de la mascota.
    edad: 0, // Edad de la mascota.
    peso: 0, // Peso de la mascota.
    enfermedad: '', // Enfermedad de la mascota.
    foto: '', // URL de la foto de la mascota.
    estado: true, // Estado de la mascota (activo/inactivo).
    cedulaCliente: 0, // Cédula del dueño de la mascota.
    tratamientos: [], // Lista de tratamientos asociados a la mascota.
  };

  // Constructor del componente, donde se inyectan los servicios necesarios.
  constructor(private mascotasService: MascotasService, private router: Router) {}

  // Método que se llama al enviar el formulario para agregar una nueva mascota.
  agregarMascota(): void {
    // Llama al servicio para agregar la mascota, pasando la nueva mascota y la cédula del cliente.
    this.mascotasService.agregarMascotaAdmin(this.nuevaMascota, this.nuevaMascota.cedulaCliente).subscribe(
      response => {
        alert('Mascota agregada exitosamente'); // Muestra un mensaje de éxito al agregar la mascota.

        // Reinicia el objeto nuevaMascota para permitir agregar otra mascota.
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

        // Navega a la lista de todas las mascotas.
        this.router.navigate(['/mascotas/todas']);
      },
      error => {
        console.error('Error al agregar la mascota:', error); // Muestra un error en la consola si ocurre un problema.
        alert('Ocurrió un error al agregar la mascota. Inténtalo nuevamente.'); // Muestra un mensaje de error al usuario.
      }
    );
  }
  
}
