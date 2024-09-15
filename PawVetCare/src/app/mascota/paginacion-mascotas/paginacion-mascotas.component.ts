import { Component } from '@angular/core';

@Component({
  selector: 'app-paginacion-mascotas',
  templateUrl: './paginacion-mascotas.component.html',
  styleUrls: ['./paginacion-mascotas.component.css']
})
export class PaginacionMascotasComponent {
  userType = 'admin';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  mascotas: NodeListOf<HTMLElement>;

  constructor() {
    // Inicializa tus variables si es necesario aquí.
    this.mascotas = document.querySelectorAll('.mascota-item');
  }

  ngOnInit(): void {
    // Este es el lugar donde deberías ejecutar la lógica que necesitas cuando se cargue el componente.
    this.showPage(this.currentPage);
  }

  showPage(page: number): void {
    const start: number = (page - 1) * this.itemsPerPage;
    const end: number = start + this.itemsPerPage;

    this.mascotas.forEach((mascota, index) => {
      if (index >= start && index < end) {
        mascota.style.display = 'block';
      } else {
        mascota.style.display = 'none';
      }
    });

    const pageNumberElement = document.getElementById('pageNumber');
    if (pageNumberElement) {
      pageNumberElement.textContent = String(page);
    }
  }

  changePage(direction: number): void {
    const totalPages: number = Math.ceil(this.mascotas.length / this.itemsPerPage);

    this.currentPage += direction;

    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    this.showPage(this.currentPage);
  }
}
