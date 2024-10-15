import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo', // El selector que se usará para este componente en el HTML
  templateUrl: './equipo.component.html', // Ruta del archivo de plantilla HTML del componente
  styleUrls: ['./equipo.component.css'] // Ruta del archivo de estilos CSS del componente
})
export class EquipoComponent {
  private slideIndex = 0; // Índice para llevar el control de la diapositiva actual

  constructor() { }

  ngOnInit(): void {
    // Método que se llama una vez que el componente ha sido inicializado
    // Puedes realizar inicializaciones aquí si es necesario
  }

  ngAfterViewInit(): void {
    // Método que se llama después de que la vista del componente ha sido inicializada
    // Se llama a showSlides para iniciar la presentación de diapositivas
    this.showSlides();
  }

  private showSlides(): void {
    // Obtiene todas las diapositivas de la clase 'mySlides'
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;

    // Oculta todas las diapositivas
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    this.slideIndex++; // Aumenta el índice de la diapositiva actual

    // Si el índice supera el número total de diapositivas, reinicia a 1
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }

    // Muestra la diapositiva actual
    slides[this.slideIndex - 1].style.display = 'block';

    // Configura un temporizador para cambiar la diapositiva automáticamente cada 5 segundos
    setTimeout(() => this.showSlides(), 5000); // Cambia la imagen cada 5 segundos
  }
}
