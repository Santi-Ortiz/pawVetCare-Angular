import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';
import { Medicamento } from 'src/app/model/medicamento';
import { Tratamiento } from 'src/app/model/tratamiento';

@Component({
  selector: 'app-carrusel-top-medicamentos',
  templateUrl: './carrusel-top-medicamentos.component.html',
  styleUrls: ['./carrusel-top-medicamentos.component.css']
})
export class CarruselTopMedicamentosComponent {
  @Input() top3Tratamientos: Tratamiento[] = []; 
  // Array de medicamentos que se recibe como entrada (Input). Se inicializa como un array vacío.
  
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  // Referencia al elemento del DOM que contendrá el carrusel.

  index = 0; // Índice actual del medicamento que se muestra en el carrusel.
  intervalId: any; // ID del intervalo para poder limpiar el intervalo al destruir el componente.

  ngOnInit(): void {
    this.autoMoverCarrusel(); // Llama al método para iniciar el movimiento automático del carrusel.
  }

  ngOnDestroy(): void {
    // Método del ciclo de vida que se ejecuta al destruir el componente.
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo para evitar fugas de memoria.
    }
  }

  cambiarTratamiento(direccion: number): void {
    // Método que cambia el medicamento que se muestra en el carrusel.
    const totalTratamientos = this.top3Tratamientos.length; // Obtiene la cantidad total de medicamentos.
    this.index = (this.index + direccion + totalTratamientos) % totalTratamientos; 
    // Actualiza el índice actual basado en la dirección (1 para siguiente, -1 para anterior).
    // Utiliza el operador módulo para asegurar que el índice esté dentro de los límites del array.

    if (this.carrusel) {
      // Si la referencia al carrusel es válida, aplica una transformación CSS para moverlo.
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
      // Mueve el carrusel en el eje X basado en el índice actual.
    }
  }

  autoMoverCarrusel(): void {
    // Método para iniciar el movimiento automático del carrusel.
    this.intervalId = setInterval(() => this.cambiarTratamiento(1), 6000); 
    // Cambia automáticamente al siguiente medicamento cada 6 segundos.
  }
}
