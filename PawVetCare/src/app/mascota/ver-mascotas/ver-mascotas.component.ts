import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../../model/mascota';
import { MascotasService } from '../../services/mascotas.service';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cliente } from 'src/app/model/cliente';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-ver-mascotas', // Define el selector que se utilizará en el HTML para este componente
  templateUrl: './ver-mascotas.component.html', // Ruta del archivo de plantilla HTML para el componente
  styleUrls: ['./ver-mascotas.component.css'] // Ruta del archivo de estilos CSS para este componente
})
export class VerMascotasComponent {

  userType: string | null | undefined;
  cliente: Cliente | undefined;
  mascotaName: string = "";
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
    cedulaCliente: 0,
    tratamientos: [],
  };

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined; // Referencia al elemento del carrusel en la plantilla HTML

  // Constructor que inyecta los servicios necesarios
  constructor(
    private mascotasService: MascotasService, // Servicio para obtener y gestionar mascotas
    private router: Router, // Servicio de enrutamiento para navegar entre páginas
    private authService: AuthService, // Servicio de autenticación para obtener información del usuario
    private clienteService: ClienteService,
    private dataShareService: DataShareService, 
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.userType = this.authService.getUserRole(); // Obtiene el tipo de usuario autenticado
    console.log("El userType es: ", this.userType); // Imprime el tipo de usuario en la consola

    this.loadMascotas(); // Carga las mascotas según el tipo de usuario
    this.autoMoverCarrusel(); // Activa el desplazamiento automático del carrusel
  }

  // Método para cargar las mascotas según el rol del usuario
  loadMascotas(): void {
    if (this.userType === 'admin') {
      // Si el usuario es administrador, carga todas las mascotas
      this.mascotasService.obtenerMascotasAdmin().subscribe(
        (data: Mascota[]) => {
          this.mascotas = data; // Asigna las mascotas obtenidas al arreglo
        },
        (error) => {
          console.error('Error al obtener mascotas del administrador', error); // Maneja el error
        }
      );
    } else if (this.userType === 'vet') {
      // Si el usuario es veterinario, carga solo las mascotas que puede gestionar
      this.mascotasService.obtenerMascotasVet().subscribe(
        (data: Mascota[]) => {
          this.mascotas = data; // Asigna las mascotas obtenidas al arreglo
        },
        (error) => {
          console.error('Error al obtener mascotas del veterinario', error); // Maneja el error
        }
      );
    } else if (this.userType === 'cliente') {
      // Si el usuario es un cliente, carga las mascotas asociadas a ese cliente
      const idCliente = this.authService.getUserId(); // Obtiene el ID del cliente autenticado

      if (idCliente !== null) {
        // Verifica que el ID del cliente no sea nulo
        this.clienteService.obtenerMascotasCliente(idCliente).subscribe(
          (data: Mascota[]) => {
            this.mascotas = data; // Asigna las mascotas obtenidas al arreglo
          },
          (error: any) => {
            console.error('Error al obtener mascotas del cliente', error); // Maneja el error
          }
        );
      } else {
        console.error('El ID del cliente es nulo.'); // Maneja el caso en que no haya un ID válido
      }
    }
  }

  // Método que se ejecuta al destruir el componente, detiene el intervalo del carrusel
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Detiene el intervalo de desplazamiento automático del carrusel
    }
  }

  // Método para cambiar la mascota visible en el carrusel
  cambiarMascota(direccion: number): void {
    const totalMascotas = this.mascotas.length; // Obtiene el número total de mascotas
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; // Calcula el nuevo índice circularmente
    console.log(`Mostrando mascota en índice: ${this.index}`); // Imprime el índice actual en la consola
    if (this.carrusel) {
      // Si el carrusel está definido, mueve el carrusel horizontalmente
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; // Cambia la posición del carrusel
    }
  }

  // Método para activar el desplazamiento automático del carrusel cada 6 segundos
  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000); // Cambia la mascota cada 6 segundos
  }

  buscarMascotas(): void {
    if (this.mascotaName.trim()) {
      this.mascotasService.buscarMascotasPorNombre(this.mascotaName).subscribe(
        (response: Mascota[]) => {
          console.log('Mascotas encontradas:', response);
          // Guarda las mascotas en el servicio compartido con la bandera de búsqueda activa
          this.dataShareService.setMascotas(response, true);
          // Navega al componente de paginación
          this.router.navigate(['/mascotas/todas']);
        },
        (error) => {
          console.error('Error al buscar mascotas:', error);
          alert('No se encontraron mascotas con ese nombre.');
        }
      );
    } else {
      alert('Por favor, ingrese un nombre para buscar.');
    }
  }
  

  // Método para agregar una nueva mascota
  agregarMascota(): void {
    if (this.nuevaMascota.cedulaCliente === undefined) {
      // Verifica que la cédula del cliente esté asignada
      alert('Por favor, asigna un cliente válido antes de agregar la mascota.');
      return; // Si no está, sale del método
    }
    // Llama al servicio para agregar la nueva mascota, pasando los datos de la mascota y la cédula del cliente
    this.mascotasService.agregarMascotaAdmin(this.nuevaMascota, this.nuevaMascota.cedulaCliente).subscribe(
      (response) => {
        alert('Mascota agregada exitosamente'); // Muestra una alerta de éxito

        // Reinicia los campos del formulario de la nueva mascota
        this.nuevaMascota = {
          id: 0,
          nombre: '',
          raza: '',
          edad: 0,
          peso: 0,
          enfermedad: '',
          foto: '',
          estado: true,
          cedulaCliente: 0,
          tratamientos: [],
        };
        this.loadMascotas(); // Recarga la lista de mascotas después de agregar una nueva
      },
      (error) => {
        alert('Error al agregar la mascota. Por favor, intenta de nuevo.'); // Muestra una alerta de error
      }
    );
  }
}
