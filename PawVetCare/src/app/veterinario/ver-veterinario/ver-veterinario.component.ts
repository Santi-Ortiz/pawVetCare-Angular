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
    vetId: number | undefined;

    nuevoVeterinario: Veterinario = {
      id: 0,
      cedula: 0,
      contrasena: '',
      foto: '',
      nombre: '',
      especialidad: {
        id: 0,
        nombreEspecialidad: '',
      },
      tratamientos: [],
    }

    @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined;

    constructor(private veterinarioService: VeterinarioService, private router: Router) {} 

    ngOnInit(): void {
      this.veterinarioService.getAllVeterinarios().subscribe()
      this.autoMoverCarrusel();
    }

    ngOnDestroy(): void {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }

    cambiarVet(direccion: number): void {
      const totalVeterinarios = this.veterinarios.length;
      this.index = (this.index + direccion + totalVeterinarios) % totalVeterinarios; 
      console.log(`Mostrando veterinario en índice: ${this.index}`); 
      if (this.carrusel) {
        this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; 
      }
    }

    autoMoverCarrusel(): void {
      this.intervalId = setInterval(() => this.cambiarVet(1), 6000);
    }

    buscarVet(vetId: number | undefined): void {
      const id = Number(vetId);
      if (!id) {
        return;
      }
      this.veterinarioService.getVeterinarioById(id).subscribe(
        (veterinario: Veterinario) => {
    
          if (veterinario) {
            this.router.navigate(['/veterinario', id]);
          } else {
            alert(`Veterinario con ID ${id} no encontrado`);
          }
        },
        (error) => {
          console.error('Error al buscar el veterinario:', error);
          alert(`Error al buscar el veterinario con ID ${id}`);
        }
      );
    }
    
    
    agregarVeterinario(): void {
      this.veterinarioService.addVeterinario(this.nuevoVeterinario,this.nuevoVeterinario.cedula).subscribe(
        (response: string) => {
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
        especialidad: {
          id: 0,
          nombreEspecialidad: '',
        },
        tratamientos: [],
      }
    }
    
  }
