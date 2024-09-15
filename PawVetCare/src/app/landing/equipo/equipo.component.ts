import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {
  private slideIndex = 0;

  constructor() { }

  ngOnInit(): void {
    // Puedes realizar inicializaciones aquí si es necesario
  }

  ngAfterViewInit(): void {
    this.showSlides();
  }

  private showSlides(): void {
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    this.slideIndex++;

    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }

    slides[this.slideIndex - 1].style.display = 'block';

    setTimeout(() => this.showSlides(), 5000); // Cambia la imagen cada 5 segundos
  }
}
