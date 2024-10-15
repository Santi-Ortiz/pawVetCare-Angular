import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-container-sesion-form-administrador',
  templateUrl: './container-sesion-form-administrador.component.html',
  styleUrls: ['./container-sesion-form-administrador.component.css']
})
export class ContainerSesionFormAdministradorComponent {
  admin = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el inicio de sesión del administrador
  loginAdmin(): void {
    this.authService.loginAdmin(this.admin.username, this.admin.password).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);
        this.authService.setUserRole('admin');
        this.router.navigate(['/mascotas']); // Redirige al administrador a la página de mascotas
      },
      (error) => {
        console.error('Error de inicio de sesión', error);
        alert('Credenciales incorrectas');
      }
    );
  }
}
