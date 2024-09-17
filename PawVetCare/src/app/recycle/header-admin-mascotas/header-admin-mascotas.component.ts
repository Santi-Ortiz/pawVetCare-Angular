import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header-admin-mascotas',
  templateUrl: './header-admin-mascotas.component.html',
  styleUrls: ['./header-admin-mascotas.component.css']
})
export class HeaderAdminMascotasComponent {
  @Input() userType: string | undefined; // Recibimos el tipo de usuario como input
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escuchar cambios en la navegación para obtener la ruta actual
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  // Método para verificar si la ruta actual coincide o es derivada de una ruta específica
  isActiveRoute(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }
}
