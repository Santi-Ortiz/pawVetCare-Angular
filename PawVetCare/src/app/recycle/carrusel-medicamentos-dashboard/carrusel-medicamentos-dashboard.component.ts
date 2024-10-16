import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Medicamento } from 'src/app/model/medicamento';

@Component({
  selector: 'app-carrusel-medicamentos-dashboard',
  templateUrl: './carrusel-medicamentos-dashboard.component.html',
  styleUrls: ['./carrusel-medicamentos-dashboard.component.css']
})
export class CarruselMedicamentosDashboardComponent {
  @Input() medicamentos: Medicamento[] = []; 
  // Lista de medicamentos que se recibirán como entrada en este componente.

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  // Referencia al elemento del carrusel para manipular su estilo y animaciones.

  index = 0; // Índice del medicamento actualmente visible en el carrusel.
  intervalId: any; // ID del intervalo para el movimiento automático del carrusel.

  ngOnInit(): void {
    // Método que se ejecuta al inicializar el componente.
    this.autoMoverCarrusel(); // Inicia el movimiento automático del carrusel.
  }

  ngOnDestroy(): void {
    // Método que se ejecuta justo antes de que el componente sea destruido.
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo para evitar fugas de memoria.
    }
  }

  cambiarMedicamento(direccion: number): void {
    // Método para cambiar el medicamento visible en el carrusel.
    const totalMedicamentos = this.medicamentos.length; // Total de medicamentos disponibles.
    
    // Calcula el nuevo índice, asegurándose de que permanezca dentro de los límites del array.
    this.index = (this.index + direccion + totalMedicamentos) % totalMedicamentos; 
    
    if (this.carrusel) {
      // Aplica una transformación de estilo al carrusel para mostrar el medicamento correspondiente.
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    // Método que configura el movimiento automático del carrusel cada 6 segundos.
    this.intervalId = setInterval(() => this.cambiarMedicamento(1), 6000);
  }
}
