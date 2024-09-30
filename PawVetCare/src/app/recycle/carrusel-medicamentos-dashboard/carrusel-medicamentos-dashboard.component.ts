import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-carrusel-medicamentos-dashboard',
  templateUrl: './carrusel-medicamentos-dashboard.component.html',
  styleUrls: ['./carrusel-medicamentos-dashboard.component.css']
})
export class CarruselMedicamentosDashboardComponent {
  @Input() mascotas: Mascota[] = [];
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  index = 0;
  intervalId: any;

  ngOnInit(): void {
    this.autoMoverCarrusel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cambiarMascota(direccion: number): void {
    const totalMascotas = this.mascotas.length;
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; 
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000);
  }
}
