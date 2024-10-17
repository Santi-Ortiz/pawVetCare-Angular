import { Component, ElementRef, ViewChild } from '@angular/core'; // Importa los módulos necesarios de Angular
import { Router } from '@angular/router'; // Importa el servicio Router para la navegación
import { Mascota } from 'src/app/model/mascota'; // Importa la clase Mascota desde el modelo
import { Medicamento } from 'src/app/model/medicamento';
import { Tratamiento } from 'src/app/model/tratamiento';
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio de mascotas
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { TratamientoService } from 'src/app/services/tratamiento.service';

@Component({
  selector: 'app-container-top-3-tratamientos', // Selector del componente
  templateUrl: './container-top-3-tratamientos.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./container-top-3-tratamientos.component.css'] // Ruta de los estilos CSS
})
export class ContainerTop3TratamientosComponent {
  userType = 'admin';  // Se establece que el tipo de usuario es 'admin'
  mascotaId: number | undefined; // ID de la mascota seleccionada
  index = 0; // Índice inicial para el carrusel
  intervalId: any; // Variable para almacenar el identificador del intervalo del carrusel
  // medicamentos: Medicamento[] = []; // Arreglo que almacenará los medicamentos
  top3Tratamientos: Tratamiento[] = [];

  

  // Accedemos al carrusel en la plantilla HTML mediante ViewChild
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  // Inyectamos los servicios necesarios para obtener medicamentos y la navegación
  constructor(private tratamientoService: TratamientoService, private router: Router) {} 

  // ngOnInit se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtenemos todos los medicamentos y los asignamos al arreglo 'medicamentos'
    this.tratamientoService.obtenerTop3Tratamientos().subscribe((top3Tratamientos: Tratamiento[]) => {
      this.top3Tratamientos = top3Tratamientos; // Asignamos los medicamentos obtenidos
    });

    // Activamos el movimiento automático del carrusel
    this.autoMoverCarrusel();
  }

  // ngOnDestroy se ejecuta cuando el componente es destruido
  ngOnDestroy(): void {
    // Limpiamos el intervalo del carrusel cuando el componente se destruye
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Método para cambiar de medicamento en el carrusel
  cambiarMedicamento(direccion: number): void {
    const totalTratamientos = this.top3Tratamientos.length; // Número total de medicamentos en el carrusel
    // Cambiamos el índice basado en la dirección (1 para siguiente, -1 para anterior)
    this.index = (this.index + direccion + totalTratamientos) % totalTratamientos; 
    console.log(`Mostrando medicamento en índice: ${this.index}`); // Registro del índice actual

    // Cambiamos la posición del carrusel usando transformaciones de estilo
    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
    }
  }

  // Método para mover el carrusel automáticamente cada 6 segundos
  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMedicamento(1), 6000); // Cambia al siguiente medicamento cada 6 segundos
  }

  // // Método para buscar un medicamento por ID
  // buscarTratamiento(medicamentoId: number | undefined): void {
  //   const id = Number(medicamentoId); // Convertimos el ID a número
  //   if (!id) {
  //     return; // Si no hay ID válido, salimos de la función
  //   }

  //   // Obtenemos el medicamento por su ID
  //   const medicamento = this.medicamentoService.obtenerMedicamentoPorId(id);
  //   if (medicamento) {
  //     // Si se encuentra el medicamento, navegamos a su página de detalles
  //     this.router.navigate(['/medicamento', id]);
  //   } else {
  //     // Si no se encuentra, mostramos una alerta
  //     alert(`Medicamento con ID ${id} no encontrado`);
  //   }
  // }
}
