import { Component, Input } from '@angular/core'; // Importa las decoraciones y funcionalidades básicas de Angular.
import { Mascota } from 'src/app/model/mascota'; // Importa el modelo de datos de Mascota, que define la estructura de una mascota.
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio MascotasService, que se encargará de las operaciones relacionadas con las mascotas.

@Component({
  selector: 'app-formulario-dar-tratamiento', // Define el selector para este componente, que se usará en el HTML para incluirlo.
  templateUrl: './formulario-dar-tratamiento.component.html', // Especifica la ubicación de la plantilla HTML asociada a este componente.
  styleUrls: ['./formulario-dar-tratamiento.component.css'] // Especifica la hoja de estilos CSS asociada a este componente.
})
export class FormularioDarTratamientoComponent { // Declara la clase del componente, que contiene la lógica y los datos para la plantilla.
  // Aquí puedes agregar propiedades, métodos y lógica necesaria para el formulario de tratamiento.
}
