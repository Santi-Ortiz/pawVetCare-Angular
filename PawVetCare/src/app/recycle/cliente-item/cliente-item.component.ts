import { Component, Input, SimpleChanges } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-cliente-item',
  templateUrl: './cliente-item.component.html',
  styleUrls: ['./cliente-item.component.css']
})
export class ClienteItemComponent {
  @Input() mascotas: Mascota[] = [];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 4;
  totalPages: number = 1;
  
  mascotasPagina: Mascota[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mascotas'] || changes['currentPage']) {
      this.updatePage();
    }
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.mascotasPagina = this.mascotas.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.mascotas.length / this.itemsPerPage);
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updatePage();
    }
  }
}
