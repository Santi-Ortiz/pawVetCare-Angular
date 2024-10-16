// Importamos los módulos y decoradores necesarios de Angular y los modelos de Mascota y Veterinario.
import { Component, Input, SimpleChanges } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';
import { Veterinario } from 'src/app/model/veterinario';

@Component({
  selector: 'app-veterinario-item',  // Definimos el selector para el componente.
  templateUrl: './veterinario-item.component.html',  // Ruta del archivo de la plantilla HTML.
  styleUrls: ['./veterinario-item.component.css']    // Ruta del archivo de estilos CSS.
})
export class VeterinarioItemComponent {

  // Utilizamos el decorador @Input para recibir datos desde un componente padre. Aquí, recibimos un array de veterinarios, la página actual y el número de ítems por página.
  @Input() veterinarios: Veterinario[] = [];
  @Input() currentPage: number = 1;  // Página actual, por defecto 1.
  @Input() itemsPerPage: number = 4; // Cantidad de elementos por página, por defecto 4.
  
  totalPages: number = 1;  // Calculamos el total de páginas.

  // Array que contiene los veterinarios a mostrar en la página actual.
  veterinariosPagina: Veterinario[] = [];

  // Método del ciclo de vida de Angular que se ejecuta cuando uno de los inputs del componente cambia.
  ngOnChanges(changes: SimpleChanges): void {
    // Verificamos si ha habido cambios en el array de veterinarios o en la página actual.
    if (changes['veterinarios'] || changes['currentPage']) {
      // Si hubo cambios, actualizamos la página.
      this.updatePage();
    }
  }

  // Método para actualizar los veterinarios a mostrar según la página actual.
  updatePage(): void {
    // Calculamos el índice inicial y final según la página actual y el número de ítems por página.
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Actualizamos el array de veterinarios de la página actual con un fragmento del array total de veterinarios.
    this.veterinariosPagina = this.veterinarios.slice(startIndex, endIndex);

    // Calculamos el total de páginas dividiendo el número total de veterinarios por los ítems por página.
    this.totalPages = Math.ceil(this.veterinarios.length / this.itemsPerPage);
  }

  // Método para cambiar la página, recibe una dirección (1 para siguiente, -1 para anterior).
  changePage(direction: number): void {
    // Calculamos la nueva página sumando la dirección a la página actual.
    const newPage = this.currentPage + direction;
    
    // Verificamos que la nueva página esté dentro de los límites (1 y totalPages).
    if (newPage >= 1 && newPage <= this.totalPages) {
      // Si es válida, actualizamos la página actual y volvemos a actualizar los veterinarios a mostrar.
      this.currentPage = newPage;
      this.updatePage();
    }
  }
}