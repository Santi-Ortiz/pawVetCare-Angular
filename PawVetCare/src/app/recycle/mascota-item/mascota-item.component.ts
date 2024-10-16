import { Component, Input, SimpleChanges } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-mascota-item', // Define el selector que se usará en el HTML para este componente
  templateUrl: './mascota-item.component.html', // Especifica la plantilla HTML asociada con el componente
  styleUrls: ['./mascota-item.component.css'] // Define los estilos CSS aplicables a este componente
})
export class MascotaItemComponent {

  // Decorador @Input que indica que estas propiedades se recibirán como datos desde un componente padre
  @Input() mascotas: Mascota[] = []; // Lista de mascotas que se va a mostrar en este componente
  @Input() currentPage: number = 1; // Página actual, que se usará para la paginación
  @Input() itemsPerPage: number = 4; // Cantidad de mascotas a mostrar por página

  totalPages: number = 1; // Variable que almacena el total de páginas, calculada dinámicamente
  
  mascotasPagina: Mascota[] = []; // Subconjunto de mascotas que se muestra en la página actual

  // Método que se ejecuta cuando hay cambios en las propiedades de entrada (Input)
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si hubo cambios en la lista de mascotas o en la página actual
    if (changes['mascotas'] || changes['currentPage']) {
      this.updatePage(); // Llama a la función para actualizar la página
    }
  }

  // Actualiza las mascotas que se muestran según la página actual
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage; // Índice inicial para el slicing
    const endIndex = startIndex + this.itemsPerPage; // Índice final para el slicing

    // Obtiene un subconjunto de mascotas basado en la página actual
    this.mascotasPagina = this.mascotas.slice(startIndex, endIndex);

    // Calcula el número total de páginas basado en la cantidad de mascotas
    this.totalPages = Math.ceil(this.mascotas.length / this.itemsPerPage);
  }

  // Método para cambiar la página según la dirección (anterior o siguiente)
  changePage(direction: number): void {
    const newPage = this.currentPage + direction; // Calcula la nueva página
    // Asegura que la nueva página esté dentro de los límites permitidos
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Actualiza la página actual
      this.updatePage(); // Vuelve a actualizar las mascotas que se mostrarán
    }
  }
}