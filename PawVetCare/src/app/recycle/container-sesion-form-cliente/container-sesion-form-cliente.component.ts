import { HttpErrorResponse } from '@angular/common/http'; // Importa el tipo para manejar errores de HTTP
import { Component } from '@angular/core'; // Importa el decorador Component para definir un componente Angular
import { Router } from '@angular/router'; // Importa Router para navegar entre rutas
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio de autenticación para manejar el inicio de sesión

@Component({
  selector: 'app-container-sesion-form-cliente', // Selector que permite usar este componente en otras plantillas
  templateUrl: './container-sesion-form-cliente.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./container-sesion-form-cliente.component.css'] // Ruta al archivo de estilos CSS del componente
})
export class ContainerSesionFormClienteComponent {
  id: string = ''; // Cédula del cliente, inicializada como una cadena vacía

  // Constructor que inyecta AuthService y Router
  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el inicio de sesión del cliente
  loginCliente(): void {
    // Llama al método loginCliente del servicio de autenticación
    this.authService.loginCliente(this.id).subscribe(
      response => {
        console.log('Inicio de sesión exitoso', response); // Log del éxito del inicio de sesión
        this.authService.setUserId(response.cedula); // Guarda el ID del cliente en el servicio de autenticación
        this.authService.setUserRole('cliente'); // Establece el rol del usuario como 'cliente'
        this.router.navigate(['/mascotas']); // Redirige al cliente a la página de mascotas
      },
      error => {
        console.error('Error de inicio de sesión', error); // Log del error de inicio de sesión
        alert('Error de inicio de sesión: ' + error.error); // Muestra un mensaje de error al usuario
      }
    );
  }
}
