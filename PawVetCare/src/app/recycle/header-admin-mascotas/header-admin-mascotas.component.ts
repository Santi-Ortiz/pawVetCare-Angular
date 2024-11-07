import { Component, Input } from '@angular/core'; // Importa los decoradores Component e Input de Angular para definir componentes y recibir datos.
import { NavigationEnd, Router } from '@angular/router'; // Importa NavigationEnd y Router para manejar la navegación y los eventos de ruta.
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header-admin-mascotas', // Define el selector para usar este componente en otras plantillas.
  templateUrl: './header-admin-mascotas.component.html', // Especifica la ubicación de la plantilla HTML del componente.
  styleUrls: ['./header-admin-mascotas.component.css'] // Especifica las hojas de estilo CSS que se aplican a este componente.
})
export class HeaderAdminMascotasComponent {
  @Input() userType: string | undefined; // Recibe el tipo de usuario como una propiedad de entrada (input), permitiendo que otros componentes le pasen este valor.
  currentRoute: string = ''; // Propiedad para almacenar la ruta actual a la que ha navegado el usuario.

  constructor(private router: Router, private authService: AuthService) {} // Constructor que inyecta el servicio Router para permitir la navegación y el manejo de eventos.

  ngOnInit(): void { // Método del ciclo de vida de Angular que se ejecuta después de que el componente ha sido inicializado.
    // Escucha los eventos de navegación para actualizar la ruta actual cada vez que cambia.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { // Verifica si el evento es de tipo NavigationEnd, que indica que la navegación ha terminado.
        this.currentRoute = event.urlAfterRedirects; // Actualiza la propiedad currentRoute con la URL a la que se ha redirigido.
      }
    });
  }

  // Método que verifica si la ruta actual comienza con una ruta específica.
  isActiveRoute(route: string): boolean {
    return this.currentRoute.startsWith(route); // Devuelve true si la ruta actual inicia con la ruta proporcionada, lo que permite resaltar elementos de navegación activos.
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
