import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicamento } from 'src/app/model/medicamento';
import { Tratamiento } from 'src/app/model/tratamiento';
import { AuthService } from 'src/app/services/auth.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { VeterinarioService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-carrusel-historial',
  templateUrl: './carrusel-historial.component.html',
  styleUrls: ['./carrusel-historial.component.css']
})
export class CarruselHistorialComponent {
  @Input() marginTop: string = '0px'; // Input para establecer el margen superior del carrusel desde el componente padre
  @Input() left: string = '0px'; // Input para establecer la posición 'left' del carrusel desde el componente padre
  @Input() tratamientos: Tratamiento[] = []; 
  // Array de medicamentos que se recibe como entrada (Input). Se inicializa como un array vacío.
  
  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;
  // Referencia al elemento del DOM que contendrá el carrusel.

  index = 0; // Índice actual del medicamento que se muestra en el carrusel.
  intervalId: any; // ID del intervalo para poder limpiar el intervalo al destruir el componente.

  constructor(
    private mascotaService: MascotasService, 
  
    private fb: FormBuilder,  // Inyecta el servicio FormBuilder para manejar formularios
    private route: ActivatedRoute, // Inyecta la ruta activa para obtener parámetros de la URL
    private router: Router,  // Inyecta el enrutador para redirigir a otras páginas
    private mascotasService: MascotasService, 
    private veterinarioService: VeterinarioService, 
    private medicamentoService: MedicamentoService, 
    private authService: AuthService,  // Inyecta el servicio de autenticación para obtener el rol del usuario
  ) {}

  ngOnInit(): void {
    // Método del ciclo de vida que se ejecuta al inicializar el componente.
    this.autoMoverCarrusel(); // Llama al método para iniciar el movimiento automático del carrusel.
    const medicamentoName = this.medicamentoService.obtenerMedicamentoPorId(this.tratamientos[0].id);
    const veterinarioName = this.veterinarioService.getVeterinarioById(this.tratamientos[0].id);
  }

  ngOnDestroy(): void {
    // Método del ciclo de vida que se ejecuta al destruir el componente.
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo para evitar fugas de memoria.
    }
  }

  cambiarTratamiento(direccion: number): void {
    // Método que cambia el medicamento que se muestra en el carrusel.
    const totalTratamientos = this.tratamientos.length; // Obtiene la cantidad total de medicamentos.
    this.index = (this.index + direccion + totalTratamientos) % totalTratamientos; 
    // Actualiza el índice actual basado en la dirección (1 para siguiente, -1 para anterior).
    // Utiliza el operador módulo para asegurar que el índice esté dentro de los límites del array.

    if (this.carrusel) {
      // Si la referencia al carrusel es válida, aplica una transformación CSS para moverlo.
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
      // Mueve el carrusel en el eje X basado en el índice actual.
    }
  }

  autoMoverCarrusel(): void {
    // Método para iniciar el movimiento automático del carrusel.
    this.intervalId = setInterval(() => this.cambiarTratamiento(1), 6000); 
    // Cambia automáticamente al siguiente medicamento cada 6 segundos.
  }
}
