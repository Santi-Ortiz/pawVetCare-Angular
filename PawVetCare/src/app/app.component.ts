// Importación del decorador Component de Angular
import { Component } from '@angular/core';

// Decorador que define el componente Angular
@Component({
  // Selector utilizado para insertar este componente en el HTML
  selector: 'app-root',
  // Ruta del archivo de plantilla HTML asociado a este componente
  templateUrl: './app.component.html',
  // Ruta del archivo de estilos CSS asociado a este componente
  styleUrls: ['./app.component.css']
})
// Clase del componente principal de la aplicación
export class AppComponent {
  // Propiedad que almacena el título de la aplicación
  title = 'PawVetCare';
  // Propiedad que define el tipo de usuario (por defecto, se establece como 'usuario')
  userType = 'usuario'; 
}