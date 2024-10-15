import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-container-sesion-form-cliente',
  templateUrl: './container-sesion-form-cliente.component.html',
  styleUrls: ['./container-sesion-form-cliente.component.css']
})
export class ContainerSesionFormClienteComponent {
  id: string = ''; // Cédula del cliente

  constructor(private authService: AuthService, private router: Router) {}

  loginCliente(): void {
    this.authService.loginCliente(this.id).subscribe(
      response => {
        console.log('Inicio de sesión exitoso', response);
        this.authService.setUserId(response.cedula); // Guardar el ID del cliente si es necesario
        this.authService.setUserRole('cliente');
        this.router.navigate(['/mascotas']); // Redirigir a la página de mascotas
      },
      error => {
        console.error('Error de inicio de sesión', error);
        alert('Error de inicio de sesión: ' + error.error); // Mostrar mensaje de error
      }
    );
  }
}
