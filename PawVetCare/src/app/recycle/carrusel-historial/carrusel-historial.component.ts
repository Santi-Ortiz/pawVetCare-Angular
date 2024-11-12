import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tratamiento } from 'src/app/model/tratamiento';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { VeterinarioService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-carrusel-historial',
  templateUrl: './carrusel-historial.component.html',
  styleUrls: ['./carrusel-historial.component.css']
})
export class CarruselHistorialComponent {
  @Input() marginTop: string = '0px'; // Input para margen superior
  @Input() left: string = '0px'; // Input para posición izquierda
  @Input() tratamientos: Tratamiento[] = []; // Array de tratamientos

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

  index = 0; // Índice actual del carrusel
  intervalId: any; // ID del intervalo

  constructor(
    private medicamentoService: MedicamentoService,
    private veterinarioService: VeterinarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.autoMoverCarrusel();
    this.cargarDatosTratamientos(); // Cargar nombres de medicamentos  veterinarios
    if (this.tratamientos?.length > 0) {
      this.tratamientos.forEach((tratamiento) => {
        // Cargar el nombre del veterinario
        if (!tratamiento.veterinarioNombre) {
          this.veterinarioService.getVeterinarioById(tratamiento.veterinarioId).subscribe((veterinario) => {
            tratamiento.veterinarioNombre = veterinario.nombre || 'Sin nombre';
          });
        }

         // Asignar el medicamento en la posición 0
         console.log("hola"+tratamiento.tratamientoMedicamentos?.[0])
         tratamiento.medicamentoPosicionCero = tratamiento.tratamientoMedicamentos?.[0] || {
           nombre: 'Sin nombre',
           cantidad: 'No especificada',
         };
         
        console.log('Tratamiento:', tratamiento);
        console.log('Veterinario Nombre:', tratamiento.veterinarioNombre);
        console.log('Medicamentos:', tratamiento.tratamientoMedicamentos);

      });
    } else {
      console.warn('No se recibieron tratamientos o el array está vacío.');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tratamientos']) {
      console.log('Tratamientos recibidos en carrusel:', this.tratamientos);
    }
    if (this.tratamientos?.length > 0) {
      this.tratamientos.forEach((tratamiento) => {
        // Cargar el nombre del veterinario
        if (!tratamiento.veterinarioNombre) {
          this.veterinarioService.getVeterinarioById(tratamiento.veterinarioId).subscribe((veterinario) => {
            tratamiento.veterinarioNombre = veterinario.nombre || 'Sin nombre';
          });
        }
        
        tratamiento.medicamentoPosicionCero = tratamiento.tratamientoMedicamentos?.[0] || {
          nombre: 'Sin nombre',
          cantidad: 'No especificada',
        };
  
        console.log('Tratamiento:', tratamiento.fecha);
        console.log('Veterinario Nombre:', tratamiento.veterinarioNombre);
        console.log('Medicamentos:', tratamiento.tratamientoMedicamentos);
      });
    }
  }  

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpiar intervalo al destruir componente
    }
  }

  cambiarTratamiento(direccion: number): void {
    const totalTratamientos = this.tratamientos.length;
    this.index = (this.index + direccion + totalTratamientos) % totalTratamientos;

    if (this.carrusel) {
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`;
    }
  }

  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarTratamiento(1), 6000);
  }

  cargarDatosTratamientos(): void {
    console.log("entre")
    console.log(this.tratamientos)
    this.tratamientos.forEach((tratamiento) => {
      console.log("aca")
      // Cargar el nombre del veterinario
      this.veterinarioService.getVeterinarioById(tratamiento.veterinarioId).subscribe((veterinario) => {
        console.log(veterinario.nombre)
        tratamiento.veterinarioNombre = veterinario.nombre || 'Sin nombre';
      });
    
      // Cargar los nombres de los medicamentos
      tratamiento.tratamientoMedicamentos.forEach((medicamento) => {
        console.log("aqui"+medicamento.id)
        if (!medicamento.nombre) {
          this.medicamentoService.obtenerMedicamentoPorId(medicamento.id).subscribe((medicamentoCargado) => {
            medicamento.nombre = medicamentoCargado.nombre || 'Nombre no disponible';
          });
        }
      });
    });
    
  }
}
