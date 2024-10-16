import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-carrusel-clientes', // Selector del componente
  templateUrl: './carrusel-clientes.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./carrusel-clientes.component.css'] // Ruta al archivo de estilos CSS
})
export class CarruselClientesComponent {
  @Input() clientes: Cliente[] = []; // Propiedad de entrada para recibir la lista de clientes
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined; // Referencia al elemento del carrusel en el DOM
  index = 0; // Índice del cliente actualmente visible en el carrusel
  intervalId: any; // ID del intervalo para la auto-navegación del carrusel

  ngOnInit(): void {
    this.autoMoverCarrusel(); // Inicia la función de auto-navegación al cargar el componente
  }

  ngOnDestroy(): void {
    // Se llama al destruir el componente
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo si está activo
    }
  }

  cambiarMascota(direccion: number): void {
    // Cambia el índice del cliente actual según la dirección (1 para adelante, -1 para atrás)
    const totalMascotas = this.clientes.length; // Total de clientes disponibles
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; 
    // Asegura que el índice se mantenga dentro de los límites del total de clientes
    if (this.carrusel) {
      // Aplica la transformación para mover el carrusel
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    // Configura el intervalo para mover el carrusel automáticamente cada 6 segundos
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000);
  }
}
