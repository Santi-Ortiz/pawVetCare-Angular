import { Component , ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MascotasService } from '../../services/mascotas.service'; 
import { Mascota } from '../../model/mascota';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paginacion-mascotas',
  templateUrl: './paginacion-mascotas.component.html',
  styleUrls: ['./paginacion-mascotas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaginacionMascotasComponent {
  userType: string | null | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1; 
  mascotas: Mascota[] = []; 

  constructor(private mascotasService: MascotasService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserRole(); 
 
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
