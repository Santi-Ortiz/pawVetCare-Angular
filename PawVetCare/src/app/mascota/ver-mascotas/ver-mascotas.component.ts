import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ver-mascotas',
  templateUrl: './ver-mascotas.component.html',
  styleUrls: ['./ver-mascotas.component.css']
})
export class VerMascotasComponent {
  userType = 'admin'; 
  index = 0;
  intervalId: any;

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  constructor() {}

  ngOnInit(): void {
    this.autoMoverCarrusel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cambiarMascota(direccion: number): void {
    const items = document.querySelectorAll('.mascota-item');
    if (items.length === 0) return;

    this.index = (this.index + direccion + items.length) % items.length;
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 106.5}%)`;
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000);
  }
}
