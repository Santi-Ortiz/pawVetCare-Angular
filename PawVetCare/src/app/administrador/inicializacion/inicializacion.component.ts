import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/model/mascota';
import { Medicamento } from 'src/app/model/medicamento';
import { MascotasService } from 'src/app/services/mascotas.service';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-inicializacion', // El selector de este componente, usado en las plantillas HTML
  templateUrl: './inicializacion.component.html', // Plantilla HTML asociada
  styleUrls: ['./inicializacion.component.css'] // Estilos asociados
})
export class InicializacionComponent {
  userType = 'admin';  // Se establece que el tipo de usuario es 'admin'
  mascotaId: number | undefined; // ID de la mascota seleccionada
  index = 0; // Índice inicial para el carrusel
  intervalId: any; // Variable para almacenar el identificador del intervalo del carrusel
  medicamentos: Medicamento[] = []; // Arreglo que almacenará los medicamentos

  // Inicializamos un nuevo objeto 'Medicamento'
  nuevoMedicamento: Medicamento = {
    id: 0,
    nombre: '',
    precio_venta: 0,
    precio_compra: 0,
    unidades_disponibles: 0,
    unidades_vendidas: 0
  }

  // Accedemos al carrusel en la plantilla HTML mediante ViewChild
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  // Inyectamos los servicios necesarios para obtener medicamentos y la navegación
  constructor(private medicamentoService: MedicamentoService, private router: Router) {} 

  // ngOnInit se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtenemos todos los medicamentos y los asignamos al arreglo 'medicamentos'
    this.medicamentoService.obtenerTodosMedicamentos().subscribe((medicamentos: Medicamento[]) => {
      this.medicamentos = medicamentos; // Asignamos los medicamentos obtenidos
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
    const totalMedicamentos = this.medicamentos.length; // Número total de medicamentos en el carrusel
    // Cambiamos el índice basado en la dirección (1 para siguiente, -1 para anterior)
    this.index = (this.index + direccion + totalMedicamentos) % totalMedicamentos; 
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

  // Método para buscar un medicamento por ID
  buscarMedicamento(medicamentoId: number | undefined): void {
    const id = Number(medicamentoId); // Convertimos el ID a número
    if (!id) {
      return; // Si no hay ID válido, salimos de la función
    }

    // Obtenemos el medicamento por su ID
    const medicamento = this.medicamentoService.obtenerMedicamentoPorId(id);
    if (medicamento) {
      // Si se encuentra el medicamento, navegamos a su página de detalles
      this.router.navigate(['/medicamento', id]);
    } else {
      // Si no se encuentra, mostramos una alerta
      alert(`Medicamento con ID ${id} no encontrado`);
    }
  }
  
}
