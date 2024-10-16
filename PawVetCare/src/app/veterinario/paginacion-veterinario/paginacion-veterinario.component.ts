// Importaciones necesarias para el componente
import { Component } from '@angular/core'; // Importa la clase base para definir un componente en Angular
import { Router } from '@angular/router'; // Importa el servicio Router para manejar la navegación
import { Veterinario } from 'src/app/model/veterinario'; // Importa el modelo Veterinario
import { VeterinarioService } from 'src/app/services/vet.service'; // Importa el servicio para obtener datos de veterinarios

// Decorador para definir metadatos del componente
@Component({
  selector: 'app-paginacion-veterinario', // Selector del componente que se usará en otras partes de la aplicación
  templateUrl: './paginacion-veterinario.component.html', // Archivo HTML asociado a este componente
  styleUrls: ['./paginacion-veterinario.component.css'] // Archivo CSS asociado a este componente
})
export class PaginacionVeterinarioComponent {
  userType: string = 'admin'; // Variable que indica el tipo de usuario, inicializada como 'admin'
  currentPage: number = 1; // Página actual de la paginación, iniciando en 1
  itemsPerPage: number = 4; // Número de elementos a mostrar por página
  totalPages: number = 1; // Total de páginas calculadas
  veterinarios: Veterinario[] = []; // Arreglo para almacenar la lista de veterinarios

  // Constructor que inyecta el servicio de veterinarios y el router para la navegación
  constructor(private veterinarioService: VeterinarioService, private router: Router) {}

  // Método de ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
      // Se llama al servicio para obtener la lista de veterinarios
      this.veterinarioService.getAllVeterinarios().subscribe((veterinarios: Veterinario[]) => {
        this.veterinarios = veterinarios; // Asigna la lista de veterinarios recibida
        console.log(this.veterinarios); // Imprime la lista de veterinarios en la consola
        // Calcula el total de páginas según la longitud de la lista y los elementos por página
        this.totalPages = Math.ceil(this.veterinarios.length / this.itemsPerPage);
      }, (error: any) => {
        // Manejo de errores en caso de que la carga falle
        console.error('Error al cargar los veterinarios:', error);  
      });
  }

  // Método para cambiar la página actual en la paginación
  changePage(direction: number): void {
    const newPage = this.currentPage + direction; // Calcula la nueva página según la dirección (puede ser -1 o +1)
    // Verifica que la nueva página esté dentro de los límites
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Actualiza la página actual
    }
  }
}