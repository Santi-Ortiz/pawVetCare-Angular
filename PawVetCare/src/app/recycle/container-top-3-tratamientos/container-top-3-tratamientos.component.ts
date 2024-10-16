import { Component, ElementRef, ViewChild } from '@angular/core'; // Importa los módulos necesarios de Angular
import { Router } from '@angular/router'; // Importa el servicio Router para la navegación
import { Mascota } from 'src/app/model/mascota'; // Importa la clase Mascota desde el modelo
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio de mascotas

@Component({
  selector: 'app-container-top-3-tratamientos', // Selector del componente
  templateUrl: './container-top-3-tratamientos.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./container-top-3-tratamientos.component.css'] // Ruta de los estilos CSS
})
export class ContainerTop3TratamientosComponent {
  userType = 'admin'; // Variable para almacenar el tipo de usuario (admin o vet)
  mascotaId: number | undefined; // ID de la mascota seleccionada
  index = 0; // Índice actual del carrusel
  intervalId: any; // ID del intervalo para el carrusel
  mascotas: Mascota[] = []; // Array para almacenar la lista de mascotas
  mascotaSeleccionada: Mascota | undefined; // Mascota seleccionada por el usuario

  // Objeto para almacenar la nueva mascota que se va a agregar
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

  // Referencia al elemento del carrusel
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  constructor(private mascotasService: MascotasService, private router: Router) {} 

  ngOnInit(): void {
    // Método que se ejecuta al inicializar el componente
    // Se valida el tipo de usuario: admin o veterinario
    if (this.userType === 'admin') {
      // Si es un administrador, obtiene la lista de mascotas desde el servicio
      this.mascotasService.obtenerMascotasAdmin().subscribe((mascotas: Mascota[]) => {
        this.mascotas = mascotas; // Almacena la lista de mascotas
      });
      console.log('Admin accediendo a las mascotas');
    } else if (this.userType === 'vet') {
      // Si es un veterinario, obtiene la lista de mascotas desde el servicio
      this.mascotasService.obtenerMascotasVet().subscribe((mascotas: Mascota[]) => {
        this.mascotas = mascotas; // Almacena la lista de mascotas
      });
      console.log('Veterinario accediendo a las mascotas');
    }
  
    this.autoMoverCarrusel(); // Inicia el movimiento automático del carrusel
  }
  

  ngOnDestroy(): void {
    // Método que se ejecuta al destruir el componente
    // Limpia el intervalo si existe
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cambiarMascota(direccion: number): void {
    // Método para cambiar la mascota mostrada en el carrusel
    const totalMascotas = this.mascotas.length; // Total de mascotas disponibles
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; // Calcula el nuevo índice
    console.log(`Mostrando mascota en índice: ${this.index}`); // Muestra el índice actual en la consola
    if (this.carrusel) {
      // Aplica la transformación al carrusel para mostrar la mascota correspondiente
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    // Método para mover automáticamente el carrusel cada 6 segundos
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000);
  }

  buscarMascota(mascotaId: number | undefined): void {
    // Método para buscar una mascota por su ID
    let mascota: Mascota | undefined; // Variable para almacenar la mascota encontrada
    const id = Number(mascotaId); // Convierte el ID a número
    if (!id) {
      return; // Si el ID no es válido, sale del método
    }
    
    // Se valida el tipo de usuario: admin o veterinario
    if (this.userType === 'admin') {
      // Si es un administrador, busca la mascota por ID
      const mascota = this.mascotasService.obtenerMascotaPorId(id).subscribe((mascota: Mascota) => {
        this.mascotaSeleccionada = mascota; // Almacena la mascota seleccionada
      });
    } else if (this.userType === 'vet') {
      // Si es un veterinario, busca la mascota por ID
      const mascota = this.mascotasService.obtenerMascotaPorId(id).subscribe((mascota: Mascota) => {
        this.mascotaSeleccionada = mascota; // Almacena la mascota seleccionada
      });
    }
    
    if (mascota) {
      // Si se encontró la mascota, navega a la página de detalles de la mascota
      this.router.navigate(['/mascota', id]);
    } else {
      // Si no se encontró la mascota, muestra un mensaje de alerta
      alert(`Mascota con ID ${id} no encontrada`);
    }
  }
  
  agregarMascota(): void {
    // Método para agregar una nueva mascota
    if (this.userType === 'admin') {
      // Si es un administrador, utiliza el servicio para agregar la mascota
      this.mascotasService.agregarMascotaAdmin(this.nuevaMascota, this.nuevaMascota.cedulaCliente); 
    } else if (this.userType === 'vet') {
      // Si es un veterinario, utiliza el servicio para agregar la mascota
      this.mascotasService.agregarMascotaVet(this.nuevaMascota, this.nuevaMascota.cedulaCliente); 
    }
    alert('Mascota agregada exitosamente'); // Muestra un mensaje de éxito
    // Resetea el objeto nuevaMascota a su estado inicial
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
  }
}
