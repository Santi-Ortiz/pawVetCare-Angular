// Importamos los módulos y clases necesarios
import { Component, Input, SimpleChanges } from '@angular/core';
import { Medicamento } from 'src/app/model/medicamento'; // Importa el modelo de datos 'Medicamento'

// Definimos el componente con su selector, archivo HTML y CSS correspondientes
@Component({
  selector: 'app-medicamento-item',
  templateUrl: './medicamento-item.component.html',
  styleUrls: ['./medicamento-item.component.css']
})
export class MedicamentoItemComponent {
  // Propiedades de entrada del componente que se reciben desde el componente padre
  @Input() medicamentos: Medicamento[] = []; // Lista de medicamentos
  @Input() currentPage: number = 1; // Página actual que se está mostrando
  @Input() itemsPerPage: number = 4; // Cantidad de medicamentos que se muestran por página

  // Variable que indica el número total de páginas
  totalPages: number = 1;
  
  // Array que contiene los medicamentos que se van a mostrar en la página actual
  medicamentoPagina: Medicamento[] = [];

  // Método que detecta cambios en las propiedades de entrada del componente
  ngOnChanges(changes: SimpleChanges): void {
    // Si la lista de medicamentos o el número de página cambian, actualizamos la página
    if (changes['medicamentos'] || changes['currentPage']) {
      this.updatePage(); // Llamada al método que actualiza los datos de la página
    }
  }

  // Método que actualiza los medicamentos mostrados en la página actual
  updatePage(): void {
    // Calculamos los índices de inicio y fin para obtener los medicamentos correspondientes a la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Extraemos una porción del array 'medicamentos' para mostrar solo los de la página actual
    this.medicamentoPagina = this.medicamentos.slice(startIndex, endIndex);

    // Calculamos el número total de páginas
    this.totalPages = Math.ceil(this.medicamentos.length / this.itemsPerPage);
  }

  // Método para cambiar de página
  changePage(direction: number): void {
    // Calculamos la nueva página basada en la dirección (-1 para retroceder, 1 para avanzar)
    const newPage = this.currentPage + direction;

    // Si la nueva página está dentro de los límites (entre 1 y el total de páginas), actualizamos la página
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage; // Actualizamos la página actual
      this.updatePage(); // Actualizamos el contenido mostrado en base a la nueva página
    }
  }
}