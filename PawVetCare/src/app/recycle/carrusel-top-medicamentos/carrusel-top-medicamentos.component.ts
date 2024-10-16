import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-carrusel-top-medicamentos',
  templateUrl: './carrusel-top-medicamentos.component.html',
  styleUrls: ['./carrusel-top-medicamentos.component.css']
})
export class CarruselTopMedicamentosComponent {
  @Input() mascotas: Mascota[] = []; 
  // Entrada que recibe una lista de mascotas desde el componente padre.

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined; 
  // Referencia al elemento del carrusel en el DOM, que permite manipularlo.

  index = 0; // Índice actual del carrusel, que indica qué mascota se está mostrando.
  intervalId: any; // ID del intervalo que se utilizará para mover el carrusel automáticamente.

  ngOnInit(): void {
    // Método del ciclo de vida que se ejecuta al inicializar el componente.
    this.autoMoverCarrusel(); // Llama al método que inicia el movimiento automático del carrusel.
  }

  ngOnDestroy(): void {
    // Método del ciclo de vida que se ejecuta al destruir el componente.
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo para evitar fugas de memoria.
    }
  }

  cambiarMascota(direccion: number): void {
    // Método que cambia la mascota mostrada en el carrusel.
    const totalMascotas = this.mascotas.length; // Total de mascotas en el array.
    // Actualiza el índice considerando la dirección y asegurando que se mantenga dentro de los límites.
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; 
    if (this.carrusel) {
      // Aplica un estilo de transformación al carrusel para mostrar la mascota correspondiente.
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    // Método que establece un intervalo para mover el carrusel automáticamente.
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000); // Cambia de mascota cada 6 segundos.
  }
}
