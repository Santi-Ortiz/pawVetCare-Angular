import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-paginacion-medicamentos',
  templateUrl: './paginacion-medicamentos.component.html',
  styleUrls: ['./paginacion-medicamentos.component.css']
})
export class PaginacionMedicamentosComponent {
  userType: string = 'admin';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1; 
  mascotas: Mascota[] = []; 

  constructor(private mascotasService: MascotasService, private router: Router) {}

  ngOnInit(): void {
 
    if (this.userType === 'admin') {
      this.mascotasService.obtenerMascotasAdmin().subscribe(
        (mascotas: Mascota[]) => {
          this.mascotas = mascotas;
          this.calcularTotalPaginas();  
        },
        (error) => {
          console.error('Error al cargar las mascotas del admin:', error);
        }
      );
    } else if (this.userType === 'vet') {
   
      this.mascotasService.obtenerMascotasVet().subscribe(
        (mascotas: Mascota[]) => {
          this.mascotas = mascotas;
          this.calcularTotalPaginas(); 
        },
        (error) => {
          console.error('Error al cargar las mascotas del vet:', error);
        }
      );
    }
  }
  
  calcularTotalPaginas(): void {
    this.totalPages = Math.ceil(this.mascotas.length / this.itemsPerPage);
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }
}
