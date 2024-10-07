import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-ver-veterinario',
  templateUrl: './ver-veterinario.component.html',
  styleUrls: ['./ver-veterinario.component.css']
})
export class VerVeterinarioComponent {
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

  constructor(private mascotasService: MascotasService, private router: Router) {} 

  ngOnInit(): void {
    if (this.userType === 'admin') {
      this.mascotasService.obtenerMascotasAdmin().subscribe((mascotas: Mascota[]) => {
        this.mascotas = mascotas;
        console.log(this.mascotas);  
        this.autoMoverCarrusel();
      }, (error: any) => {
        console.error('Error al cargar las mascotas:', error);  
      });
    }else if (this.userType === 'vet') {
      this.mascotasService.obtenerMascotasVet().subscribe((mascotas: Mascota[]) => {
        this.mascotas = mascotas;
        console.log(this.mascotas);  
        this.autoMoverCarrusel();
      }, (error: any) => {
        console.error('Error al cargar las mascotas:', error);  
      });
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
    this.mascotasService.obtenerMascotaPorId(id).subscribe(
      (mascota: Mascota) => {
  
        if (mascota) {
          this.router.navigate(['/veterinario', id]);
        } else {
          alert(`Mascota con ID ${id} no encontrada`);
        }
      },
      (error) => {
        console.error('Error al buscar la mascota:', error);
        alert(`Error al buscar la mascota con ID ${id}`);
      }
    );
  }
  
  
  agregarMascota(): void {
   
    if (this.userType === 'admin') {
   
      this.mascotasService.agregarMascotaAdmin(this.nuevaMascota, this.nuevaMascota.cliente).subscribe(
        (response: string) => {
          alert('Mascota agregada exitosamente (Admin)');
          this.resetFormularioMascota();  
        },
        (error) => {
          console.error('Error al agregar mascota (Admin):', error);
          alert('Error al agregar la mascota');
        }
      );
    } else if (this.userType === 'vet') {
      
      this.mascotasService.agregarMascotaVet(this.nuevaMascota, this.nuevaMascota.cliente).subscribe(
        (response: string) => {
          alert('Mascota agregada exitosamente (Vet)');
          this.resetFormularioMascota();  
        },
        (error) => {
          console.error('Error al agregar mascota (Vet):', error);
          alert('Error al agregar la mascota');
        }
      );
    }
  }
  
  resetFormularioMascota(): void {
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
      tratamientos: []
    };
  }
  
}
