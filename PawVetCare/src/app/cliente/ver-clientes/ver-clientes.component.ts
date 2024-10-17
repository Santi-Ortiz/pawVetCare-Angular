// Importación de los módulos y servicios necesarios
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente'; // Modelo Cliente
import { Mascota } from 'src/app/model/mascota'; // Modelo Mascota
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service'; // Servicio para clientes
import { MascotasService } from 'src/app/services/mascotas.service'; // Servicio para mascotas

// Decorador que define el componente y enlaza su template y estilos
@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent {
  userType: string | null | undefined; // Define si el usuario es admin o veterinario
  cedulaCliente: number | undefined; // ID del cliente que se buscará
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
  constructor(private clientesService: ClienteService, private authService: AuthService, private router: Router) {} 

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.userType = this.authService.getUserRole(); // Obtiene el tipo de usuario autenticado
    console.log("El userType es: ", this.userType);
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

  // Método para buscar una mascota o cliente por su cedula
  buscarCliente(cedulaCliente: number | undefined): void {
    const cedula = Number(cedulaCliente); // Convierte la cédula a número
  
    if (!cedula) { // Si la cédula es inválido, muestra un mensaje de error
      alert('Cedula de cliente inválida.');
      return;
    }
  
    // Si el usuario es admin, realiza la búsqueda de cliente por cedula
    if (this.userType === 'admin') {
      this.clientesService.obtenerClientePorCedula(cedula).subscribe(
        (cliente: Cliente) => {
          this.nuevoCliente = cliente; // Asigna el cliente encontrado
          this.router.navigate(['/cliente', cedula]); // Navega a la página del cliente con esa cédula
        },
        (error) => { // Muestra error si no se encuentra el cliente
          console.error(`Error al obtener la mascota para admin con ID ${cedula}:`, error);
          alert(`Mascota con ID ${cedula} no encontrada`);
        }
      );
    } else if (this.userType === 'vet') { // Lo mismo para veterinarios
      this.clientesService.obtenerClientePorCedula(cedula).subscribe(
        (cliente: Cliente) => {
          this.nuevoCliente = cliente;
          this.router.navigate(['/cliente', cedula]); 
        },
        (error) => {
          console.error(`Error al obtener la cédula para vet con cedula ${cedula}:`, error);
          alert(`Cliente con cedula ${cedula} no encontrada`);
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
