// Importación de los módulos y servicios necesarios
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente'; // Modelo Cliente
import { Mascota } from 'src/app/model/mascota'; // Modelo Mascota
import { ClienteService } from 'src/app/services/cliente.service'; // Servicio para clientes
import { MascotasService } from 'src/app/services/mascotas.service'; // Servicio para mascotas

// Decorador que define el componente y enlaza su template y estilos
@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent {
  userType = 'admin'; // Define si el usuario es admin o veterinario
  clienteId: number | undefined; // ID del cliente que se buscará
  index = 0; // Índice inicial del carrusel de clientes
  intervalId: any; // Almacena el identificador del intervalo del carrusel automático
  clientes: Cliente[] = []; // Lista de clientes

  // Datos para un nuevo cliente que se agregará al sistema
  nuevoCliente: Cliente = {
    id: 0,
    cedula: 0,
    nombre: '',
    correo: '',
    celular: 0,
    mascotas: [],
  };

  // Referencia al elemento HTML del carrusel para manipularlo
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  mascotaSeleccionada: Mascota | undefined; // Mascota seleccionada, si aplica
  
  // Constructor que inyecta los servicios necesarios
  constructor(private clientesService: ClienteService, private router: Router) {} 

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Validación del tipo de usuario (admin o vet) y obtención de la lista de clientes
    if (this.userType === 'admin') {
      this.clientesService.obtenerTodosClientes().subscribe((clientes: Cliente[]) => {
        this.clientes = clientes; // Se asigna la lista de clientes
      });
      console.log('Admin accediendo a las mascotas');
    } else if (this.userType === 'vet') {
      this.clientesService.obtenerTodosClientes().subscribe((clientes: Cliente[]) => {
        this.clientes = clientes; // Similar para veterinarios
      });
    }
  
    this.autoMoverCarrusel(); // Inicia el movimiento automático del carrusel
  }

  // Método que se ejecuta cuando el componente se destruye
  ngOnDestroy(): void {
    // Limpia el intervalo del carrusel para evitar fugas de memoria
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Método para cambiar la mascota/cliente mostrado en el carrusel
  cambiarMascota(direccion: number): void {
    const totalMascotas = this.clientes.length; // Total de clientes
    // Calcula el nuevo índice del carrusel, considerando la dirección (avanzar o retroceder)
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; 
    console.log(`Mostrando mascota en índice: ${this.index}`); 
    
    // Si el carrusel está definido, ajusta la posición de desplazamiento
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  // Método que activa el auto-movimiento del carrusel, cambiando automáticamente cada 6 segundos
  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000);
  }

  // Método para buscar una mascota o cliente por su ID
  buscarMascota(mascotaId: number | undefined): void {
    const id = Number(mascotaId); // Convierte el ID a número
  
    if (!id) { // Si el ID es inválido, muestra un mensaje de error
      alert('ID de mascota inválido.');
      return;
    }
  
    // Si el usuario es admin, realiza la búsqueda de cliente por ID
    if (this.userType === 'admin') {
      this.clientesService.obtenerClientePorId(id).subscribe(
        (cliente: Cliente) => {
          this.nuevoCliente = cliente; // Asigna el cliente encontrado
          this.router.navigate(['/mascota', id]); // Navega a la página de la mascota con ese ID
        },
        (error) => { // Muestra error si no se encuentra la mascota
          console.error(`Error al obtener la mascota para admin con ID ${id}:`, error);
          alert(`Mascota con ID ${id} no encontrada`);
        }
      );
    } else if (this.userType === 'vet') { // Lo mismo para veterinarios
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
  
  // Método para agregar una nueva mascota/cliente al sistema
  agregarMascota(): void {
    // Lógica para agregar el cliente según el tipo de usuario (admin o vet)
    if (this.userType === 'admin') {
      this.clientesService.agregarCliente(this.nuevoCliente); // Llamada al servicio para agregar
    } else if (this.userType === 'vet') {
      this.clientesService.agregarCliente(this.nuevoCliente); 
    }
    alert('Mascota agregada exitosamente'); // Mensaje de éxito

    // Resetea el formulario de cliente
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
