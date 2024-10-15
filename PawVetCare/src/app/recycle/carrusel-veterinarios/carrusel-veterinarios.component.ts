import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';
import { Veterinario } from 'src/app/model/veterinario';

@Component({
  selector: 'app-carrusel-veterinarios',
  templateUrl: './carrusel-veterinarios.component.html',
  styleUrls: ['./carrusel-veterinarios.component.css']
})
export class CarruselVeterinariosComponent {
  @Input() veterinarios: Veterinario[] = [];
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  index = 0;
  intervalId: any;

  ngOnInit(): void {
    console.log("Veterinarios: ", this.veterinarios);
    this.autoMoverCarrusel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cambiarVeterinario(direccion: number): void {
    const totalVeterinarios = this.veterinarios.length;
    this.index = (this.index + direccion + totalVeterinarios) % totalVeterinarios; 
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarVeterinario(1), 6000);
  }
}
