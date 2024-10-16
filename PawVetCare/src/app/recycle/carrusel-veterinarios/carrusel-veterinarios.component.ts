import { Component, ElementRef, Input, ViewChild } from '@angular/core'; // Importaciones necesarias para el componente
import { Mascota } from 'src/app/model/mascota'; // Importa el modelo de Mascota
import { Veterinario } from 'src/app/model/veterinario'; // Importa el modelo de Veterinario

@Component({
  selector: 'app-carrusel-veterinarios', // Selector del componente para usar en plantillas
  templateUrl: './carrusel-veterinarios.component.html', // Ruta del archivo HTML asociado
  styleUrls: ['./carrusel-veterinarios.component.css'] // Ruta del archivo CSS asociado
})
export class CarruselVeterinariosComponent {
  @Input() veterinarios: Veterinario[] = []; // Propiedad de entrada que recibe un arreglo de veterinarios
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined; // Referencia al elemento del carrusel
  index = 0; // Índice actual del veterinario que se muestra en el carrusel
  intervalId: any; // Variable para almacenar el ID del intervalo de auto-movimiento del carrusel

  ngOnInit(): void {
    // Método que se ejecuta al inicializar el componente
    console.log("Veterinarios: ", this.veterinarios); // Imprime la lista de veterinarios en la consola para depuración
    this.autoMoverCarrusel(); // Inicia el movimiento automático del carrusel
  }

  ngOnDestroy(): void {
    // Método que se ejecuta justo antes de que el componente sea destruido
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo si está definido para evitar fugas de memoria
    }
  }

  cambiarVeterinario(direccion: number): void {
    // Método para cambiar el veterinario mostrado en el carrusel
    const totalVeterinarios = this.veterinarios.length; // Obtiene el total de veterinarios
    // Actualiza el índice teniendo en cuenta la dirección del cambio (anterior o siguiente)
    this.index = (this.index + direccion + totalVeterinarios) % totalVeterinarios; 
    if (this.carrusel) {
      // Aplica la transformación al carrusel para mostrar el veterinario correspondiente
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    // Método para iniciar el movimiento automático del carrusel
    this.intervalId = setInterval(() => this.cambiarVeterinario(1), 6000); // Cambia automáticamente al siguiente veterinario cada 6 segundos
  }
}
