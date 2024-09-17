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
  userType: string = 'admin';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1; 
  mascotas: Mascota[] = []; 

  constructor(private mascotasService: MascotasService, private router: Router) {}

  ngOnInit(): void {
    this.mascotas = this.mascotasService.getMascotas();
    console.log(this.mascotas);  // Verifica que los datos están cargando correctamente
    this.totalPages = Math.ceil(this.mascotas.length / this.itemsPerPage);
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }

}
