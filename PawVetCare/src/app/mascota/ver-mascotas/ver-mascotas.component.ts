import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {Mascota} from '../../model/mascota';
import {MascotasService} from '../../services/mascotas.service';
import {ClienteService} from '../../services/cliente.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-ver-mascotas',
  templateUrl: './ver-mascotas.component.html',
  styleUrls: ['./ver-mascotas.component.css']
})
export class VerMascotasComponent {

  userType: string | null = null;
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
    cedulaCliente:0,
    tratamientos: [],
  };

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  clienteService: any;

  constructor(private mascotasService: MascotasService, private router: Router, private authService: AuthService) {} 

  ngOnInit(): void {
    this.userType = this.authService.getUserRole();
    this.loadMascotas();
    this.autoMoverCarrusel();
  }

  loadMascotas(): void {
    if (this.userType === 'admin') {
      this.mascotasService.obtenerMascotasAdmin().subscribe(
        (data: Mascota[]) => {
          this.mascotas = data;
        },
        (error) => {
          console.error('Error al obtener mascotas del administrador', error);
        }
      );
    } else if (this.userType === 'vet') {
      this.mascotasService.obtenerMascotasVet().subscribe(
        (data: Mascota[]) => {
          this.mascotas = data;
        },
        (error) => {
          console.error('Error al obtener mascotas del veterinario', error);
        }
      );
    } else if (this.userType === 'cliente') {
      const idCliente = this.authService.getUserId(); 
      this.clienteService.obtenerMascotasCliente(idCliente).subscribe(
        (data: Mascota[]) => {
          this.mascotas = data;
        },
        (error: any) => {
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
    const mascota = this.mascotasService.obtenerMascotaPorId(id);
    if (mascota) {
      this.router.navigate(['/mascota', id]);
    } else {
      alert(`Mascota con ID ${id} no encontrada`);
    }
  }
  
  agregarMascota(): void {
    if (this.nuevaMascota.cedulaCliente === undefined) {
      alert('Por favor, asigna un cliente válido antes de agregar la mascota.');
      return;
    }
    this.mascotasService.agregarMascotaAdmin(this.nuevaMascota,this.nuevaMascota.cedulaCliente).subscribe(
      (response) => {
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
        this.loadMascotas();
      },
      (error) => {
        alert('Error al agregar la mascota. Por favor, intenta de nuevo.');
      }
    );
  }  
}
