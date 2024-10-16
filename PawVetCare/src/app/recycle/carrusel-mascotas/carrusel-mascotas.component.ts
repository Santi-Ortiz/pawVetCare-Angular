import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Mascota } from 'src/app/model/mascota'; 

@Component({
  selector: 'app-carrusel-mascotas',
  templateUrl: './carrusel-mascotas.component.html',
  styleUrls: ['./carrusel-mascotas.component.css']
})
export class CarruselMascotasComponent {
  @Input() marginTop: string = '0px'; // Input para establecer el margen superior del carrusel desde el componente padre
  @Input() left: string = '0px'; // Input para establecer la posición 'left' del carrusel desde el componente padre
  @Input() mascotas: Mascota[] = []; // Input que recibe un array de mascotas
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined; // Referencia al elemento del DOM del carrusel
  index = 0; // Índice actual del carrusel que indica qué mascota se está mostrando
  intervalId: any; // Identificador del intervalo para el movimiento automático del carrusel

  ngOnInit(): void {
    console.log("Mascotas: ", this.mascotas); // Muestra en la consola las mascotas recibidas para depuración
    this.autoMoverCarrusel(); // Inicia el movimiento automático del carrusel al cargar el componente
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo cuando el componente se destruye, deteniendo el movimiento automático
    }
  }

  cambiarMascota(direccion: number): void {
    const totalMascotas = this.mascotas.length; // Obtiene la cantidad total de mascotas
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; 
    // Actualiza el índice de la mascota a mostrar, ajustando para asegurarse de que no salga del rango

    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
      // Cambia la posición del carrusel para mostrar la mascota correspondiente mediante una transformación CSS
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000); 
    // Configura un intervalo que cambia la mascota automáticamente cada 6 segundos
  }
}
