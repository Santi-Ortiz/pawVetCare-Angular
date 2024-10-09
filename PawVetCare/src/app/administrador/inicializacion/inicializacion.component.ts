import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

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
  mascotas: Mascota[] = [];

  nuevaMascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: '',
    estado: true,
    cedulaCliente:0,
    tratamientos: [],
  };

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  constructor(private mascotasService: MascotasService, private router: Router) {} 

  ngOnInit(): void {
    this.mascotasService.obtenerMascotasAdmin().subscribe(
      (data: Mascota[]) => {
        this.mascotas = data;
      },
      (error) => {
        console.error('Error al cargar las mascotas (admin):', error);
      }
    );
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
    console.log(`Mostrando mascota en índice: ${this.index}`); 
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000);
  }

  buscarMascota(mascotaId: number | undefined): void {
    const id = Number(mascotaId);
    if (!id) {
      return;
    }

    const mascota = this.mascotasService.obtenerMascotaPorId(id);
    if (mascota) {
      this.router.navigate(['/mascota', id]);
    } else {
      alert(`Mascota con ID ${id} no encontrada`);
    }
  }
  
  agregarMascota(): void {
    if (this.userType === 'admin') {
      this.mascotasService.agregarMascotaAdmin(this.nuevaMascota,this.nuevaMascota.cedulaCliente); 
    }else if(this.userType === 'vet'){
      this.mascotasService.agregarMascotaVet(this.nuevaMascota,this.nuevaMascota.cedulaCliente); 
    }
    alert('Mascota agregada exitosamente');
    this.nuevaMascota = { 
      id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      enfermedad: '',
      foto: '',
      estado: true,
      cedulaCliente:0,
      tratamientos: [],
    };
  }
}
