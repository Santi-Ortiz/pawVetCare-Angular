import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { Medicamento } from 'src/app/model/medicamento';
import { MascotasService } from 'src/app/services/mascotas.service';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-inicializacion',
  templateUrl: './inicializacion.component.html',
  styleUrls: ['./inicializacion.component.css']
})
export class InicializacionComponent {
  userType = 'admin'; 
  mascotaId: number | undefined;
  index = 0;
  intervalId: any;
  medicamentos: Medicamento[] = [];

  nuevoMedicamento: Medicamento = {
    id: 0,
    nombre: '',
    precio_venta: 0,
    precio_compra: 0,
    unidades_disponibles: 0,
    unidades_vendidas: 0
  }

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  constructor(private medicamentoService: MedicamentoService, private router: Router) {} 

  ngOnInit(): void {
    this.medicamentoService.obtenerTodosMedicamentos().subscribe((medicamentos: Medicamento[]) => {
      this.medicamentos = medicamentos; // Aquí asignamos el arreglo de medicamentos
    });
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
    console.log(`Mostrando medicamento en índice: ${this.index}`); 
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMedicamento(1), 6000);
  }

  buscarMedicamento(medicamentoId: number | undefined): void {
    const id = Number(medicamentoId);
    if (!id) {
      return;
    }

    const medicamento = this.medicamentoService.obtenerMedicamentoPorId(id);
    if (medicamento) {
      this.router.navigate(['/medicamento', id]);
    } else {
      alert(`Medicamento con ID ${id} no encontrado`);
    }
  }
  
}
