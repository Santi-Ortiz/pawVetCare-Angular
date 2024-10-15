import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-paginacion-clientes',
  templateUrl: './paginacion-clientes.component.html',
  styleUrls: ['./paginacion-clientes.component.css']
})
export class PaginacionClientesComponent {
  userType: string = 'admin'; // Tipo de usuario, por defecto 'admin'
  currentPage: number = 1; // Página actual de la paginación
  itemsPerPage: number = 4; // Número de clientes a mostrar por página
  totalPages: number = 1; // Total de páginas calculadas
  clientes: Cliente[] = []; // Arreglo que almacenará la lista de clientes

  // Inyectamos el servicio ClienteService y Router en el constructor
  constructor(private clientesService: ClienteService, private router: Router) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Verifica el tipo de usuario y realiza la llamada al servicio de clientes
    if (this.userType === 'admin') {
      this.clientesService.obtenerTodosClientes().subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes; // Asignamos la lista de clientes
          this.calcularTotalPaginas(); // Calculamos el número total de páginas
        },
        (error) => {
          console.error('Error al cargar los clientes del admin:', error);
        }
      );
    } else if (this.userType === 'vet') {
      this.clientesService.obtenerTodosClientes().subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes; // Asignamos la lista de clientes
          this.calcularTotalPaginas(); // Calculamos el número total de páginas
        },
        (error) => {
          console.error('Error al cargar los clientes del veterinario:', error);
        }
      );
    }
  }

  // Calcula el número total de páginas basado en la cantidad de clientes y el número de items por página
  calcularTotalPaginas(): void {
    this.totalPages = Math.ceil(this.clientes.length / this.itemsPerPage);
  }

  // Cambia de página al recibir una dirección (-1 para anterior, +1 para siguiente)
  changePage(direction: number): void {
    const newPage = this.currentPage + direction; // Calcula la nueva página
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Actualiza la página actual si es válida
    }
  }
}
