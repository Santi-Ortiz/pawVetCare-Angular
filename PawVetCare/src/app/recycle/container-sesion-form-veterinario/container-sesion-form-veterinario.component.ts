import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-container-sesion-form-veterinario',
  templateUrl: './container-sesion-form-veterinario.component.html',
  styleUrls: ['./container-sesion-form-veterinario.component.css']
})
export class ContainerSesionFormVeterinarioComponent {
  vet = {
    cedula: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  loginVet(): void {
    this.authService.loginVet(this.vet.cedula, this.vet.password).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);
        this.authService.setUserRole('vet');
        this.router.navigate(['/mascotas']); // Redirige al administrador a la página de mascotas
      },
      (error) => {
        console.error('Error de inicio de sesión', error);
        alert('Credenciales incorrectas');
      }
    );
  }
}
