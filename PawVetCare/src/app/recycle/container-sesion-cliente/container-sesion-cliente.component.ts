import { Component } from '@angular/core'; // Importa el decorador Component desde Angular core para definir componentes.

@Component({
  selector: 'app-container-sesion-cliente', // Define el selector del componente que se usará en el HTML.
  templateUrl: './container-sesion-cliente.component.html', // Indica la ubicación del archivo HTML que sirve como plantilla del componente.
  styleUrls: ['./container-sesion-cliente.component.css'] // Indica la ubicación de los estilos CSS aplicables a este componente.
})
export class ContainerSesionClienteComponent {
  // Esta clase representa el componente para la sesión del cliente. 
  // Actualmente no tiene propiedades ni métodos definidos, pero puede ser extendida para manejar la lógica del componente en el futuro.
}
