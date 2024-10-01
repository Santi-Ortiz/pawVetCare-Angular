import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {Mascota} from '../../model/mascota';
import {MascotasService} from '../../services/mascotas.service';
import {ClienteService} from '../../services/cliente.service';

@Component({
  selector: 'app-ver-mascotas',
  templateUrl: './ver-mascotas.component.html',
  styleUrls: ['./ver-mascotas.component.css']
})
export class VerMascotasComponent {

  userRole: string | null = null;
  cliente: Cliente | undefined;
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
    cliente: 0,
    tratamientos: [],
  };

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  constructor(private mascotasService: MascotasService, private router: Router, private authService: AuthService) {} 

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.loadMascotas();
    this.autoMoverCarrusel();
  }

  loadMascotas(): void {
    if (this.userRole === 'admin') {
      this.mascotasService.obtenerMascotasAdmin().subscribe(
        (data: Mascota[]) => {
          this.mascotas = data;
        },
        (error) => {
          console.error('Error al obtener mascotas del administrador', error);
        }
      );
    } else if (this.userRole === 'vet') {
      this.mascotasService.obtenerMascotasVet().subscribe(
        (data: Mascota[]) => {
          this.mascotas = data;
        },
        (error) => {
          console.error('Error al obtener mascotas del veterinario', error);
        }
      );
    } else if (this.userRole === 'cliente') {
      const idCliente = this.authService.getUserId(); 
      this.clienteService.obtenerMascotasCliente(idCliente).subscribe(
        (data: Mascota[]) => {
          this.mascotas = data;
        },
        (error) => {
          console.error('Error al obtener mascotas del cliente', error);
        }
      );
    }
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
    const mascota = this.mascotasService.getMascota(id);
    if (mascota) {
      this.router.navigate(['/mascota', id]);
    } else {
      alert(`Mascota con ID ${id} no encontrada`);
    }
  }
  
  agregarMascota(): void {
    this.mascotasService.agregarMascota(this.nuevaMascota);  // Agrega la nueva mascota al servicio
    alert('Mascota agregada exitosamente');
    this.nuevaMascota = {  // Reinicia el formulario de nueva mascota
      id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      enfermedad: '',
      foto: '',
      estado: true,
      cliente: 0,
      tratamientos: [],
    };
  }

}
