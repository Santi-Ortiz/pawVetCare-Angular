import { Component } from '@angular/core'; // Importa el decorador Component desde Angular core

@Component({
  selector: 'app-container-sesion-admin', // Define el selector para este componente, que se usará en la plantilla HTML
  templateUrl: './container-sesion-admin.component.html', // Especifica la ruta del archivo HTML que se usará como plantilla para el componente
  styleUrls: ['./container-sesion-admin.component.css'] // Especifica la ruta del archivo CSS que se usará para estilizar el componente
})
export class ContainerSesionAdminComponent {
  // Clase del componente que representa la sesión del administrador.
  // Actualmente no contiene propiedades ni métodos, pero puede ser extendida en el futuro.
}
