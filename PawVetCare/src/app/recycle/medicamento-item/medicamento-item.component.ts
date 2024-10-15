import { Component, Input, SimpleChanges } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';
import { Medicamento } from 'src/app/model/medicamento';

@Component({
  selector: 'app-medicamento-item',
  templateUrl: './medicamento-item.component.html',
  styleUrls: ['./medicamento-item.component.css']
})
export class MedicamentoItemComponent {
  @Input() medicamentos: Medicamento[] = [];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 4;
  totalPages: number = 1;
  
  medicamentoPagina: Medicamento[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['medicamentos'] || changes['currentPage']) {
      this.updatePage();
    }
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.medicamentoPagina = this.medicamentos.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.medicamentos.length / this.itemsPerPage);
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updatePage();
    }
  }
}
