import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';
import { ClienteService } from 'src/app/services/cliente.service';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent {
  userType = 'admin'; 
  clienteId: number | undefined;
  index = 0;
  intervalId: any;
  clientes: Cliente[] = [];

  nuevoCliente: Cliente = {
    id: 0,
    cedula: 0,
    nombre: '',
    correo: '',
    celular: 0,
    mascotas: [],
  };

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  mascotaSeleccionada: Mascota | undefined;
  

  constructor(private clientesService: ClienteService, private router: Router) {} 

  ngOnInit(): void {
    // Se valida el tipo de usuario: admin o veterinario
    if (this.userType === 'admin') {
      this.clientesService.obtenerTodosClientes().subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
      });
      console.log('Admin accediendo a las mascotas');
    } else if (this.userType === 'vet') {
      this.clientesService.obtenerTodosClientes().subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
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
    const totalMascotas = this.clientes.length;
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
      this.clientesService.obtenerClientePorId(id).subscribe(
        (cliente: Cliente) => {
          this.nuevoCliente = cliente;
          this.router.navigate(['/mascota', id]); 
        },
        (error) => {
          console.error(`Error al obtener la mascota para admin con ID ${id}:`, error);
          alert(`Mascota con ID ${id} no encontrada`);
        }
      );
    } else if (this.userType === 'vet') {
      this.clientesService.obtenerClientePorId(id).subscribe(
        (cliente: Cliente) => {
          this.nuevoCliente = cliente;
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
      this.clientesService.agregarCliente(this.nuevoCliente); 
    }else if(this.userType === 'vet'){
      this.clientesService.agregarCliente(this.nuevoCliente); 
    }
    alert('Mascota agregada exitosamente');
    this.nuevoCliente = {
      id: 0,
      cedula: 0,
      nombre: '',
      correo: '',
      celular: 0,
      mascotas: [],
    };
  }
}
