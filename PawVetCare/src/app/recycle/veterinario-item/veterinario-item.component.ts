import { Component, Input, SimpleChanges } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';
import { Veterinario } from 'src/app/model/veterinario';

@Component({
  selector: 'app-veterinario-item',
  templateUrl: './veterinario-item.component.html',
  styleUrls: ['./veterinario-item.component.css']
})
export class VeterinarioItemComponent {
  @Input() veterinarios: Veterinario[] = [];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 4;
  totalPages: number = 1;
  
  veterinariosPagina: Veterinario[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['veterinarios'] || changes['currentPage']) {
      this.updatePage();
    }
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.veterinariosPagina = this.veterinarios.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.veterinarios.length / this.itemsPerPage);
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updatePage();
    }
  }
}
