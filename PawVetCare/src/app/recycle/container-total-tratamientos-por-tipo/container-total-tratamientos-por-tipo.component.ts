import { Component, ElementRef, ViewChild } from '@angular/core'; // Importa Component, ElementRef y ViewChild desde Angular core
import { Router } from '@angular/router'; // Importa Router para la navegación entre rutas
import { Mascota } from 'src/app/model/mascota'; // Importa el modelo Mascota
import { Medicamento } from 'src/app/model/medicamento'; // Importa el modelo Medicamento
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio para manejar mascotas

@Component({
  selector: 'app-container-total-tratamientos-por-tipo', // Selector del componente
  templateUrl: './container-total-tratamientos-por-tipo.component.html', // Ruta del archivo HTML del componente
  styleUrls: ['./container-total-tratamientos-por-tipo.component.css'] // Ruta del archivo CSS del componente
})
export class ContainerTotalTratamientosPorTipoComponent {
  userType = 'admin'; // Define el tipo de usuario, por defecto es 'admin'
  mascotaId: number | undefined; // ID de la mascota seleccionada, inicialmente indefinido
  index = 0; // Índice del carrusel de mascotas
  intervalId: any; // ID del intervalo para auto mover el carrusel
  mascotas: Mascota[] = []; // Array para almacenar las mascotas obtenidas
  medicamentos: Medicamento[] = []; // Array para almacenar medicamentos, aún no usado

  // Objeto para almacenar información de una nueva mascota
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

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined; // Referencia al carrusel en el HTML
  mascotaSeleccionada: Mascota | undefined; // Mascota actualmente seleccionada

  constructor(private mascotasService: MascotasService, private router: Router) {} // Inyecta el servicio de mascotas y el router en el constructor

  ngOnInit(): void {
    // Al iniciar el componente, se obtienen las mascotas para el tipo de usuario 'admin'
    this.mascotasService.obtenerMascotasAdmin().subscribe(
      (mascotas: Mascota[]) => {
        this.mascotas = mascotas; // Asigna las mascotas obtenidas al array local
        this.autoMoverCarrusel(); // Inicia el movimiento automático del carrusel
      },
      (error) => {
        // Maneja cualquier error al obtener las mascotas
        console.error('Error al obtener las mascotas:', error);
        alert('Hubo un error al cargar las mascotas. Inténtalo nuevamente más tarde.');
      }
    );
  }
  
  ngOnDestroy(): void {
    // Al destruir el componente, limpia el intervalo del carrusel
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cambiarMascota(direccion: number): void {
    // Cambia el índice de la mascota mostrada en el carrusel
    const totalMascotas = this.mascotas.length; // Total de mascotas
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; // Actualiza el índice
    console.log(`Mostrando mascota en índice: ${this.index}`); 
    if (this.carrusel) {
      // Aplica la transformación al carrusel para mostrar la mascota correcta
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  autoMoverCarrusel(): void {
    // Inicia un intervalo que cambia automáticamente la mascota mostrada cada 6 segundos
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000);
  }

  buscarMascota(mascotaId: number | undefined): void {
    const id = Number(mascotaId); // Convierte el ID a número

    // Valida si el ID es válido
    if (!id) {
      alert('ID de mascota inválido.');
      return;
    }

    // Lógica para buscar la mascota según el tipo de usuario
    if (this.userType === 'admin') {
      this.mascotasService.obtenerMascotaPorId(id).subscribe(
        (mascota: Mascota) => {
          this.mascotaSeleccionada = mascota; // Asigna la mascota seleccionada
          this.router.navigate(['/mascota', id]);  // Navega a la página de detalles de la mascota
        },
        (error) => {
          // Maneja el error en la búsqueda de la mascota
          console.error(`Error al obtener la mascota para admin con ID ${id}:`, error);
          alert(`Mascota con ID ${id} no encontrada`);
        }
      );
    } else if (this.userType === 'vet') {
      this.mascotasService.obtenerMascotaPorId(id).subscribe(
        (mascota: Mascota) => {
          this.mascotaSeleccionada = mascota; // Asigna la mascota seleccionada
          this.router.navigate(['/mascota', id]);  // Navega a la página de detalles de la mascota
        },
        (error) => {
          // Maneja el error en la búsqueda de la mascota
          console.error(`Error al obtener la mascota para vet con ID ${id}:`, error);
          alert(`Mascota con ID ${id} no encontrada`);
        }
      );
    }
  }

  agregarMascota(): void {
    // Lógica para agregar una nueva mascota según el tipo de usuario
    if (this.userType === 'admin') {
      this.mascotasService.agregarMascotaAdmin(this.nuevaMascota, this.nuevaMascota.cedulaCliente); 
    } else if (this.userType === 'vet') {
      this.mascotasService.agregarMascotaVet(this.nuevaMascota, this.nuevaMascota.cedulaCliente); 
    }
    
    alert('Mascota agregada exitosamente'); // Mensaje de éxito al agregar la mascota

    // Reinicia el formulario de nueva mascota
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
