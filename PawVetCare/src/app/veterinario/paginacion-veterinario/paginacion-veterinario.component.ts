import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { VeterinarioService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-paginacion-veterinario',
  templateUrl: './paginacion-veterinario.component.html',
  styleUrls: ['./paginacion-veterinario.component.css']
})
export class PaginacionVeterinarioComponent {
  userType: string = 'admin';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1; 
  veterinarios: Veterinario[] = []; 

  constructor(private veterinarioService: VeterinarioService, private router: Router) {}

  ngOnInit(): void {
      this.veterinarioService.getAllVeterinarios().subscribe((veterinarios: Veterinario[]) => {
        this.veterinarios = veterinarios;
        console.log(this.veterinarios);  
        this.totalPages = Math.ceil(this.veterinarios.length / this.itemsPerPage);
      }, (error: any) => {
        console.error('Error al cargar los veterinarios:', error);  
      });
  }
  

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }
}
