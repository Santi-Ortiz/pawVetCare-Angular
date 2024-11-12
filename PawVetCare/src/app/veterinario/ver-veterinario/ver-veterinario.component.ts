// Importación de módulos y servicios necesarios para el componente
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { VeterinarioService } from 'src/app/services/vet.service';

  @Component({
    selector: 'app-ver-veterinario',
    templateUrl: './ver-veterinario.component.html',
    styleUrls: ['./ver-veterinario.component.css']
  })
  export class VerVeterinarioComponent {
    userType = 'admin'; 
    index = 0;
    intervalId: any;
    veterinarios: Veterinario[] = [];
    vetCedula: number | undefined;

    nuevoVeterinario: Veterinario = {
      id: 0,
      cedula: 0,
      contrasena: '',
      foto: '',
      nombre: '',
      estado: false,
      nombreEspecialidad: '',
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

    buscarVet(vetCedula: number | undefined): void {
      const cedula = Number(vetCedula);
      if (!cedula) {
        return;
      }
      this.veterinarioService.getVeterinarioByCedula(cedula).subscribe(
        (veterinario: Veterinario) => {
    
          if (veterinario) {
            this.router.navigate(['/veterinario', cedula]);
          } else {
            alert(`Veterinario con cédula ${cedula} no encontrado`);
          }
        },
        (error) => {
          console.error('Error al buscar el veterinario:', error);
          alert(`Error al buscar el veterinario con cédula ${cedula}`);
        }
      );
    }
    
    
    agregarVeterinario(): void {
      console.log(this.nuevoVeterinario)
      this.veterinarioService.addVeterinario(this.nuevoVeterinario,this.nuevoVeterinario.cedula).subscribe(
        (response: Veterinario) => {
          alert('Veterinario agregado exitosamente');
          this.resetFormularioVeterinario();  
        },
        (error) => {
          console.error('Error al agregar veterinario:', error);
          alert('Error al agregar veterinario');
        }
      );
    }
    
    resetFormularioVeterinario(): void {
      this.nuevoVeterinario = {
        id: 0,
        cedula: 0,
        contrasena: '',
        foto: '',
        nombre: '',
        estado: false,
        nombreEspecialidad: '',
        tratamientos: [],
      }
    }
    
  }
