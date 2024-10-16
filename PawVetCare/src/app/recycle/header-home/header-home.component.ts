import { Component } from '@angular/core'; // Importa el decorador Component de Angular, necesario para definir componentes.
import { Router } from '@angular/router'; // Importa el servicio Router para manejar la navegación entre rutas.

@Component({
  selector: 'app-header-home', // Define el selector que se utilizará para incluir este componente en otras plantillas.
  templateUrl: './header-home.component.html', // Especifica la ubicación de la plantilla HTML asociada a este componente.
  styleUrls: ['./header-home.component.css'] // Especifica la hoja de estilos CSS asociada a este componente.
})
export class HeaderHomeComponent {
  currentRoute: string = ''; // Propiedad para almacenar la ruta actual.

  constructor(private router: Router) { // Constructor que inyecta el servicio Router.
    // Se suscribe a los eventos de navegación del router para actualizar la ruta actual.
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;  // Actualiza la propiedad currentRoute con la URL actual.
    });
  }

  // Método que verifica si la ruta proporcionada es la ruta actual.
  isActive(route: string): boolean {
    return this.currentRoute === route; // Retorna true si la ruta actual coincide con la ruta proporcionada, false en caso contrario.
  }
}
