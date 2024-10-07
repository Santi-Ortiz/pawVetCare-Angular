import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent {
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
    cliente: 0,
    tratamientos: [],
  };

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  mascotaSeleccionada: Mascota | undefined;
  

  constructor(private mascotasService: MascotasService, private router: Router) {} 

  ngOnInit(): void {
    // Se valida el tipo de usuario: admin o veterinario
    if (this.userType === 'admin') {
      this.mascotasService.obtenerMascotasAdmin().subscribe((mascotas: Mascota[]) => {
        this.mascotas = mascotas;
      });
      console.log('Admin accediendo a las mascotas');
    } else if (this.userType === 'vet') {
      this.mascotasService.obtenerMascotasVet().subscribe((mascotas: Mascota[]) => {
        this.mascotas = mascotas;
      });
    }
  
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
      alert('ID de mascota inválido.');
      return;
    }
  
    if (this.userType === 'admin') {
      this.mascotasService.obtenerMascotaPorId(id).subscribe(
        (mascota: Mascota) => {
          this.mascotaSeleccionada = mascota;
          this.router.navigate(['/mascota', id]); 
        },
        (error) => {
          console.error(`Error al obtener la mascota para admin con ID ${id}:`, error);
          alert(`Mascota con ID ${id} no encontrada`);
        }
      );
    } else if (this.userType === 'vet') {
      this.mascotasService.obtenerMascotaPorId(id).subscribe(
        (mascota: Mascota) => {
          this.mascotaSeleccionada = mascota;
          this.router.navigate(['/mascota', id]); 
        },
        (error) => {
          console.error(`Error al obtener la mascota para vet con ID ${id}:`, error);
          alert(`Mascota con ID ${id} no encontrada`);
        }
      );
    }
  }
  
  
  agregarMascota(): void {
    if (this.userType === 'admin') {
      this.mascotasService.agregarMascotaAdmin(this.nuevaMascota, this.nuevaMascota.cliente); 
    }else if(this.userType === 'vet'){
      this.mascotasService.agregarMascotaVet(this.nuevaMascota, this.nuevaMascota.cliente); 
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
      cliente: 0,
      tratamientos: [],
    };
  }
}
