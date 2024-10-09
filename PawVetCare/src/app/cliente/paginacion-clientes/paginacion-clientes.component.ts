import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';
import { ClienteService } from 'src/app/services/cliente.service';
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
  clientes: Cliente[] = []; 

  constructor(private clientesService: ClienteService, private router: Router) {}

  ngOnInit(): void {
 
    if (this.userType === 'admin') {
      this.clientesService.obtenerTodosClientes().subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes;
          this.calcularTotalPaginas();  
        },
        (error) => {
          console.error('Error al cargar las mascotas del admin:', error);
        }
      );
    } else if (this.userType === 'vet') {
      this.clientesService.obtenerTodosClientes().subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes;
          this.calcularTotalPaginas();  
        },
        (error) => {
          console.error('Error al cargar las mascotas del admin:', error);
        }
      );
    }
  }
  
  calcularTotalPaginas(): void {
    this.totalPages = Math.ceil(this.clientes.length / this.itemsPerPage);
  }
  

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }
}
