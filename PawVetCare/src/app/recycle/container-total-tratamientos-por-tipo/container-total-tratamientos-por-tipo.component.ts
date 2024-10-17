import { Component } from '@angular/core';
import { TratamientoMedicamentoService } from 'src/app/services/tratamientomedicamento.service';

@Component({
  selector: 'app-container-total-tratamientos-por-tipo',
  templateUrl: './container-total-tratamientos-por-tipo.component.html',
  styleUrls: ['./container-total-tratamientos-por-tipo.component.css']
})
export class ContainerTotalTratamientosPorTipoComponent {
  topTratamientos: any[] = [];  // Aquí estará tu lista de tratamientos
  itemsPerPage = 3;             // Cantidad de elementos por página
  currentPage = 0;              // Página actual
  totalPages = 0;               // Total de páginas

  constructor(private tratamientomedicamentoService: TratamientoMedicamentoService) { }

  ngOnInit(): void {
    this.getTopTratamientos();
  }

  getTopTratamientos(): void {
    this.tratamientomedicamentoService.getTratamientosPorMedicamentos().subscribe({
      next: (data) => {
        this.topTratamientos = data;
        this.totalPages = Math.ceil(this.topTratamientos.length / this.itemsPerPage);  // Calcula el total de páginas
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Método para obtener los tratamientos de la página actual
  paginatedTratamientos(): any[] {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.topTratamientos.slice(start, end);
  }

  // Método para ir a la página anterior
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // Método para ir a la página siguiente
  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
    }
  }
}
