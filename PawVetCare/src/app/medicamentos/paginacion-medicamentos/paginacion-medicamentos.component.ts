import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';
import { Medicamento } from 'src/app/model/medicamento';
import { MedicamentoService } from 'src/app/services/medicamento.service';

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
  medicamentos: Medicamento[] = [];

  constructor(private medicamentoService: MedicamentoService, private router: Router) {} 

  ngOnInit(): void {
    this.medicamentoService.obtenerTodosMedicamentos().subscribe((medicamentos: Medicamento[]) => {
      this.medicamentos = medicamentos; // Aquí asignamos el arreglo de medicamentos
    });
    this.calcularTotalPaginas();
  }
  
  calcularTotalPaginas(): void {
    this.totalPages = Math.ceil(this.medicamentos.length / this.itemsPerPage);
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }
}
