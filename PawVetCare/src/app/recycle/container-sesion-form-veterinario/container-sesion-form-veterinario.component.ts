import { Component } from '@angular/core'; // Importa el decorador Component de Angular
import { Router } from '@angular/router'; // Importa el servicio Router para manejar la navegación
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-container-sesion-form-veterinario', // Selector para utilizar este componente en HTML
  templateUrl: './container-sesion-form-veterinario.component.html', // Archivo de plantilla HTML asociado al componente
  styleUrls: ['./container-sesion-form-veterinario.component.css'] // Archivos de estilos CSS asociados al componente
})
export class ContainerSesionFormVeterinarioComponent { // Clase del componente para el formulario de sesión del veterinario
  vet = { // Objeto que contiene las propiedades de cédula y contraseña del veterinario
    cedula: '', // Inicializa la cédula como una cadena vacía
    password: '' // Inicializa la contraseña como una cadena vacía
  };

  constructor(private authService: AuthService, private router: Router) {} // Constructor que inyecta AuthService y Router

  // Método para manejar el inicio de sesión del veterinario
  loginVet(): void {
    // Llama al servicio de autenticación para realizar el inicio de sesión
    this.authService.loginVet(this.vet.cedula, this.vet.password).subscribe(
      (response) => { // Si la solicitud es exitosa
        console.log('Inicio de sesión exitoso', response); // Muestra un mensaje de éxito en la consola
        this.authService.setUserRole('vet'); // Establece el rol de usuario como veterinario
        this.router.navigate(['/mascotas']); // Redirige al veterinario a la página de mascotas
      },
      (error) => { // Si hay un error durante el inicio de sesión
        console.error('Error de inicio de sesión', error); // Muestra el error en la consola
        alert('Credenciales incorrectas'); // Muestra un mensaje de alerta con el error
      }
    );
  }
}
