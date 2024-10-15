import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Medicamento } from 'src/app/model/medicamento';
@Component({
  selector: 'app-carrusel-medicamentos',
  templateUrl: './carrusel-medicamentos.component.html',
  styleUrls: ['./carrusel-medicamentos.component.css']
})
export class CarruselMedicamentosComponent {
  @Input() medicamentos: Medicamento[] = []; 
  // @Input() mascotas: Mascota[] = [];
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

  cambiarMedicamento(direccion: number): void {
    const totalMedicamentos = this.medicamentos.length;
    this.index = (this.index + direccion + totalMedicamentos) % totalMedicamentos; 
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMedicamento(1), 6000);
  }
}
