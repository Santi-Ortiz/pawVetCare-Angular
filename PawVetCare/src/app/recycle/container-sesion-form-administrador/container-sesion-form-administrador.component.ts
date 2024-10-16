import { Component } from '@angular/core'; // Importa el decorador Component de Angular para crear un componente
import { Router } from '@angular/router'; // Importa el Router para la navegación entre componentes
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio de autenticación para manejar el inicio de sesión

@Component({
  selector: 'app-container-sesion-form-administrador', // Selector del componente que se usará en la plantilla
  templateUrl: './container-sesion-form-administrador.component.html', // Ruta al archivo HTML que define la vista del componente
  styleUrls: ['./container-sesion-form-administrador.component.css'] // Ruta a los estilos CSS específicos del componente
})
export class ContainerSesionFormAdministradorComponent { // Definición de la clase del componente
  admin = { // Objeto que almacena las credenciales del administrador
    username: '', // Propiedad para el nombre de usuario
    password: '' // Propiedad para la contraseña
  };

  constructor(private authService: AuthService, private router: Router) {} // Constructor que inyecta los servicios de autenticación y de enrutamiento

  // Método para manejar el inicio de sesión del administrador
  loginAdmin(): void { // Método que no retorna ningún valor
    this.authService.loginAdmin(this.admin.username, this.admin.password).subscribe( // Llama al método loginAdmin del servicio de autenticación
      (response) => { // Callback que se ejecuta si la llamada es exitosa
        console.log('Inicio de sesión exitoso', response); // Muestra en consola que el inicio de sesión fue exitoso
        this.authService.setUserRole('admin'); // Establece el rol del usuario como 'admin' en el servicio de autenticación
        this.router.navigate(['/mascotas']); // Redirige al administrador a la página de mascotas
      },
      (error) => { // Callback que se ejecuta si hay un error en la llamada
        console.error('Error de inicio de sesión', error); // Muestra el error en la consola
        alert('Credenciales incorrectas'); // Muestra una alerta al usuario sobre credenciales incorrectas
      }
    );
  }   
}
