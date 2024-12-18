import { Component , ViewEncapsulation } from '@angular/core'; // Importa el decorador Component y ViewEncapsulation de Angular
import { Router } from '@angular/router'; // Importa el servicio Router para la navegación entre rutas
import { MascotasService } from '../../services/mascotas.service'; // Importa el servicio que gestiona las mascotas
import { Mascota } from '../../model/mascota'; // Importa la interfaz o clase Mascota para tipar las mascotas
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio de autenticación para obtener el rol del usuario
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-paginacion-mascotas', // Selector utilizado para insertar este componente en el HTML
  templateUrl: './paginacion-mascotas.component.html', // Ruta del archivo HTML asociado a este componente
  styleUrls: ['./paginacion-mascotas.component.css'], // Ruta del archivo CSS asociado a este componente
  encapsulation: ViewEncapsulation.None // Indica que no se encapsularán los estilos, permitiendo que afecten a otros elementos del DOM
})
export class PaginacionMascotasComponent {
  userType: string | null | undefined; // Variable para almacenar el tipo de usuario (admin, vet, cliente, etc.)
  currentPage: number = 1; // Variable para manejar la página actual del paginador
  itemsPerPage: number = 4; // Define cuántos elementos (mascotas) se mostrarán por página
  totalPages: number = 1; // Variable para almacenar el número total de páginas
  mascotas: Mascota[] = []; // Array que contiene la lista de mascotas cargadas

  // Constructor que inyecta los servicios MascotasService, Router y AuthService
  constructor(private mascotasService: MascotasService, private dataShareService: DataShareService, private router: Router, private authService: AuthService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.userType = this.authService.getUserRole(); // Obtiene el tipo de usuario autenticado
    console.log("El userType es: ", this.userType); // Imprime el tipo de usuario en la consola
    if (this.dataShareService.isSearch()) {
      // Si la búsqueda está activa, utiliza los resultados del servicio compartido
      this.mascotas = this.dataShareService.getMascotas();
      this.calcularTotalPaginas();
    } else {
      // Si no hay búsqueda activa, carga todas las mascotas del administrador
      this.mascotasService.obtenerMascotasAdmin().subscribe(
        (mascotas: Mascota[]) => {
          this.mascotas = mascotas;
          this.calcularTotalPaginas();
        },
        (error) => {
          console.error('Error al cargar las mascotas:', error);
        }
      );
    }
  }

  // Método para calcular el número total de páginas basado en el número de mascotas y el número de items por página
  calcularTotalPaginas(): void {
    this.totalPages = Math.ceil(this.mascotas.length / this.itemsPerPage); // Redondea hacia arriba el número total de páginas
  }

  // Método para cambiar la página del paginador
  changePage(direction: number): void {
    const newPage = this.currentPage + direction; // Calcula la nueva página sumando o restando dependiendo de la dirección
    // Verifica que la nueva página esté dentro del rango permitido (entre 1 y totalPages)
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Asigna la nueva página a currentPage
    }
  }
}
