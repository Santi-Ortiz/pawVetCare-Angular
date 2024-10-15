import { Component } from '@angular/core';

// Decorador que define el componente
@Component({
  // Selector que permite utilizar el componente en plantillas HTML
  selector: 'app-iniciar-cliente',
  
  // Ruta del archivo de plantilla HTML asociado al componente
  templateUrl: './iniciar-cliente.component.html',
  
  // Ruta del archivo de estilos CSS asociado al componente
  styleUrls: ['./iniciar-cliente.component.css']
})
// Clase del componente que contiene la lógica de la interfaz
export class IniciarClienteComponent {
  // Aquí puedes definir propiedades y métodos relacionados con el inicio de sesión del cliente
}
