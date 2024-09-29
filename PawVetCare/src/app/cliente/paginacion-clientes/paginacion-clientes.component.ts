import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-paginacion-clientes',
  templateUrl: './paginacion-clientes.component.html',
  styleUrls: ['./paginacion-clientes.component.css']
})
export class PaginacionClientesComponent {
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
