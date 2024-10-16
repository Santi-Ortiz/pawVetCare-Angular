import { Component, Input, SimpleChanges } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-cliente-item', // Selector para usar este componente en otros templates
  templateUrl: './cliente-item.component.html', // Archivo HTML asociado
  styleUrls: ['./cliente-item.component.css'] // Archivo CSS asociado
})
export class ClienteItemComponent {
  @Input() clientes: Cliente[] = []; // Entrada de tipo Cliente, se espera una lista de clientes
  @Input() currentPage: number = 1; // Página actual que se está visualizando
  @Input() itemsPerPage: number = 4; // Número de items (clientes) por página
  totalPages: number = 1; // Total de páginas calculado en función de los clientes
  mascotasPagina: Cliente[] = []; // Array que contendrá los clientes de la página actual

  ngOnChanges(changes: SimpleChanges): void {
    // Detecta cambios en las entradas del componente
    if (changes['clientes'] || changes['currentPage']) {
      this.updatePage(); // Actualiza la página si hay cambios en clientes o en la página actual
    }
  }

  updatePage(): void {
    // Calcula los índices de inicio y fin para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage; // Índice de inicio
    const endIndex = startIndex + this.itemsPerPage; // Índice de fin

    // Actualiza el array de mascotasPagina con los clientes correspondientes a la página actual
    this.mascotasPagina = this.clientes.slice(startIndex, endIndex);
    
    // Calcula el total de páginas en función del número de clientes
    this.totalPages = Math.ceil(this.clientes.length / this.itemsPerPage);
  }

  changePage(direction: number): void {
    // Cambia la página actual según la dirección especificada (-1 para anterior, +1 para siguiente)
    const newPage = this.currentPage + direction; // Calcula la nueva página

    // Verifica que la nueva página esté dentro de los límites válidos
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Actualiza la página actual
      this.updatePage(); // Actualiza los clientes que se mostrarán en la nueva página
    }
  }
}
