import { Component , ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MascotasService } from '../../services/mascotas.service'; 
import { Mascota } from '../../model/mascota';

@Component({
  selector: 'app-paginacion-mascotas',
  templateUrl: './paginacion-mascotas.component.html',
  styleUrls: ['./paginacion-mascotas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaginacionMascotasComponent {
  userType = 'admin';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1; 
  mascotas: Mascota[] = []; 
  
  constructor(private mascotasService: MascotasService, private router: Router) {}

  ngOnInit(): void {
    this.mascotas = this.mascotasService.getMascotas();
    console.log(this.mascotas);  // Verifica que los datos están cargando correctamente
    this.totalPages = Math.ceil(this.mascotas.length / this.itemsPerPage);
    this.updatePage();
  }
  

  showPage(page: number): void {
    const start: number = (page - 1) * this.itemsPerPage;
    const end: number = start + this.itemsPerPage;

    const pageNumberElement = document.getElementById('pageNumber');
    if (pageNumberElement) {
      pageNumberElement.textContent = String(page);
    }
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updatePage();
    }
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    const mascotasContainer = document.getElementById('mascotasContainer');
    if (mascotasContainer) {
      mascotasContainer.innerHTML = ''; // Limpiar el contenedor antes de actualizar

      this.mascotas.slice(startIndex, endIndex).forEach(mascota => {
        const mascotaElement = document.createElement('div');
        mascotaElement.classList.add('mascota-item');
        
        mascotaElement.innerHTML = `
          <div class="mascota-info">
            <img class="mascota-foto" src="${mascota.foto}" alt="Foto de ${mascota.nombre}">
            <img class="estadoimg" src="/assets/${mascota.estado ? 'check' : 'wrong'}.png" alt="Estado ${mascota.estado ? 'Activo' : 'Inactivo'}" class="estadoimg">
            <div class="info-itemNombre"><small class="info-title">Nombre:</small><label class="info-label">${mascota.nombre}</label></div>
            <div class="info-itemRaza"><small class="info-title">Raza:</small><label class="info-label">${mascota.raza}</label></div>
            <div class="info-itemEdad"><small class="info-title">Edad:</small><label class="info-label">${mascota.edad}</label></div>
            <div class="info-itemPeso"><small class="info-title">Peso:</small><label class="info-label">${mascota.peso}</label></div>
            <div class="info-itemEnfermedad"><small class="info-title">Enfermedad:</small><label class="info-label">${mascota.enfermedad}</label></div>
            <a class="info-button" onclick="window.location.href='/mascota/${mascota.id}'">+ Info</a>
          </div>
        `;
        mascotasContainer.appendChild(mascotaElement);  // Agregar el elemento al contenedor
      });
    }
  }

}
