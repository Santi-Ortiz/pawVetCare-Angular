import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota'; // Importa el modelo de Mascota, aunque no se está utilizando en este componente
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio de Mascotas, que tampoco se está utilizando
import { Medicamento } from 'src/app/model/medicamento'; // Importa el modelo de Medicamento
import { MedicamentoService } from 'src/app/services/medicamento.service'; // Importa el servicio de Medicamentos para acceder a los datos

@Component({
  selector: 'app-paginacion-medicamentos',
  templateUrl: './paginacion-medicamentos.component.html',
  styleUrls: ['./paginacion-medicamentos.component.css']
})
export class PaginacionMedicamentosComponent {
  userType: string = 'admin'; // Define el tipo de usuario como 'admin', lo que podría condicionar qué se muestra en la vista
  currentPage: number = 1; // Almacena la página actual en la que se encuentra la paginación
  itemsPerPage: number = 4; // Define cuántos medicamentos se mostrarán por página
  totalPages: number = 1;  // Total de páginas calculado con base en la cantidad de medicamentos y los ítems por página
  medicamentos: Medicamento[] = []; // Almacena la lista de medicamentos obtenidos del servicio

  constructor(private medicamentoService: MedicamentoService, private router: Router) {} 
  // Inyecta el servicio de medicamentos para obtener los datos y el servicio de Router para manejar la navegación
  
  ngOnInit(): void {
    // Cuando el componente se inicializa, se obtienen todos los medicamentos y se asignan al array `medicamentos`
    this.medicamentoService.obtenerTodosMedicamentos().subscribe((medicamentos: Medicamento[]) => {
      this.medicamentos = medicamentos; // Aquí se asigna la lista de medicamentos obtenida al array local
    });
    this.calcularTotalPaginas(); // Calcula el número total de páginas basado en el número de medicamentos y los ítems por página
  }
  
  calcularTotalPaginas(): void {
    // Calcula cuántas páginas son necesarias para mostrar todos los medicamentos con base en `itemsPerPage`
    this.totalPages = Math.ceil(this.medicamentos.length / this.itemsPerPage);
  }

  changePage(direction: number): void {
    // Cambia la página actual en la dirección indicada (siguiente o anterior)
    const newPage = this.currentPage + direction; // Suma o resta según el valor de `direction`
    
    // Verifica que la nueva página esté dentro del rango permitido
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Actualiza la página actual si es válida
    }
  }
}
