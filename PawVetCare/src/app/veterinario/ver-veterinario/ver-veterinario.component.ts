// Importación de módulos y servicios necesarios para el componente
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { VeterinarioService } from 'src/app/services/vet.service';

// Decorador del componente que define su selector, plantilla y estilos
@Component({
  selector: 'app-ver-veterinario', // Selector que se utiliza para referirse a este componente en otros templates
  templateUrl: './ver-veterinario.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./ver-veterinario.component.css'] // Ruta a los estilos CSS específicos del componente
})
export class VerVeterinarioComponent {
  // Propiedades del componente
  userType = 'admin'; // Tipo de usuario (admin)
  index = 0; // Índice actual del veterinario mostrado en el carrusel
  intervalId: any; // ID del intervalo para auto-mover el carrusel
  veterinarios: Veterinario[] = []; // Arreglo para almacenar la lista de veterinarios
  vetId: number | undefined; // ID del veterinario a buscar

  // Objeto para almacenar información de un nuevo veterinario
  nuevoVeterinario: Veterinario = {
    id: 0,
    cedula: 0,
    contrasena: '',
    foto: '',
    nombre: '',
    estado: false,
    especialidad: {
      id: 0,
      nombreEspecialidad: '',
    },
    tratamientos: [],
  }

  // Decorador ViewChild para acceder al elemento del carrusel
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  // Constructor donde se inyectan los servicios necesarios
  constructor(private veterinarioService: VeterinarioService, private router: Router) {} 

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtiene todos los veterinarios a través del servicio
    this.veterinarioService.getAllVeterinarios().subscribe((veterinarios: Veterinario[]) => {
      this.veterinarios = veterinarios; // Almacena la lista de veterinarios obtenida
    });
    this.autoMoverCarrusel(); // Inicia el movimiento automático del carrusel
  }

  // Método que se ejecuta al destruir el componente
  ngOnDestroy(): void {
    // Limpia el intervalo si existe
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Método para cambiar el veterinario mostrado en el carrusel
  cambiarVet(direccion: number): void {
    const totalVeterinarios = this.veterinarios.length; // Total de veterinarios disponibles
    // Calcula el nuevo índice asegurando que se mantenga dentro del rango
    this.index = (this.index + direccion + totalVeterinarios) % totalVeterinarios; 
    console.log(`Mostrando veterinario en índice: ${this.index}`); 
    // Aplica la transformación CSS al carrusel para mostrar el veterinario correcto
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  // Método para mover automáticamente el carrusel cada cierto tiempo
  autoMoverCarrusel(): void {
    // Establece un intervalo que cambia el veterinario cada 6000 milisegundos (6 segundos)
    this.intervalId = setInterval(() => this.cambiarVet(1), 6000);
  }

  // Método para buscar un veterinario por su cédula
  buscarVet(vetId: number | undefined): void {
    const id = Number(vetId); // Convierte el ID a número
    if (!id) {
      return; // Sale del método si el ID es inválido
    }
    // Llama al servicio para obtener el veterinario por su cédula
    this.veterinarioService.getVeterinarioByCedula(id).subscribe(
      (veterinario: Veterinario) => {
        // Si se encuentra el veterinario, navega a su página
        if (veterinario) {
          this.router.navigate(['/veterinario', id]);
        } else {
          // Muestra un mensaje de alerta si no se encuentra
          alert(`Veterinario con ID ${id} no encontrado`);
        }
      },
      (error) => {
        // Manejo de errores en caso de fallo en la búsqueda
        console.error('Error al buscar el veterinario:', error);
        alert(`Error al buscar el veterinario con ID ${id}`);
      }
    );
  }

  // Método para agregar un nuevo veterinario
  agregarVeterinario(): void {
    // Llama al servicio para agregar el nuevo veterinario
    this.veterinarioService.addVeterinario(this.nuevoVeterinario, this.nuevoVeterinario.cedula).subscribe(
      (response: string) => {
        alert('Veterinario agregado exitosamente'); // Mensaje de éxito
        this.resetFormularioVeterinario(); // Resetea el formulario
      },
      (error) => {
        // Manejo de errores al agregar el veterinario
        console.error('Error al agregar veterinario:', error);
        alert('Error al agregar veterinario');
      }
    );
  }

  // Método para reiniciar el formulario de nuevo veterinario
  resetFormularioVeterinario(): void {
    // Resetea el objeto nuevoVeterinario a su estado inicial
    this.nuevoVeterinario = {
      id: 0,
      cedula: 0,
      contrasena: '',
      foto: '',
      nombre: '',
      estado: false,
      especialidad: {
        id: 0,
        nombreEspecialidad: '',
      },
      tratamientos: [],
    }
  }
}