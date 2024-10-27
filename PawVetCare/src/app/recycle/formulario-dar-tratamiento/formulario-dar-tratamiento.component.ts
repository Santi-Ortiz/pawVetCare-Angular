import { Component, OnInit } from '@angular/core';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { AuthService } from 'src/app/services/auth.service';
import { Medicamento } from 'src/app/model/medicamento';
import { TratamientoMedicamento } from 'src/app/model/tratamientoMedicamento';
import { Tratamiento } from 'src/app/model/tratamiento';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { forkJoin, map } from 'rxjs';
import { VeterinarioService } from 'src/app/services/vet.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-formulario-dar-tratamiento',
  templateUrl: './formulario-dar-tratamiento.component.html',
  styleUrls: ['./formulario-dar-tratamiento.component.css']
})
export class FormularioDarTratamientoComponent implements OnInit {
  medicamentos: Medicamento[] = []; // Lista de medicamentos obtenidos del backend
  medicamentoSeleccionado: number | null = null;; // IDs de los medicamentos seleccionados
  cantidad: number = 1; // Cantidad inicial por defecto
  cedulaVet: number | undefined; // Cédula del veterinario que inició sesión
  userType: string | null | undefined;

  constructor(
    private medicamentosService: MedicamentoService,
    private tratamientoService: TratamientoService,
    private route: ActivatedRoute, 
    private veterinarioService: VeterinarioService,
    private mascotaService: MascotasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
    this.cargarMedicamentos();
    this.cargarUsuario();
  }

  cargarMedicamentos(): void {
    this.medicamentosService.obtenerTodosMedicamentos().subscribe(
      (data: Medicamento[]) => {
        this.medicamentos = data;
      },
      (error) => {
        console.error('Error al obtener los medicamentos:', error);
      }
    );
  }

  cargarUsuario(): void {
    this.userType = this.authService.getUserRole(); // Obtiene el rol del usuario
    if (this.userType === 'vet') {
      this.cedulaVet = this.authService.getUserId() ?? undefined;
    }
  }
  

  darTratamiento(): void {
    if (!this.medicamentoSeleccionado) {
      alert('Por favor, seleccione un medicamento.');
      return;
    }

    const mascotaId = Number(this.route.snapshot.paramMap.get('id'));

    // Ya validamos que medicamentoSeleccionado no es null, así que es seguro usarlo
    const medicamentoId: number = this.medicamentoSeleccionado;

    // Obtener el veterinario
    this.veterinarioService.getVeterinarioByCedula(this.cedulaVet!).subscribe(
      (veterinario) => {
        // Obtener la mascota
        this.mascotaService.obtenerMascotaPorId(mascotaId).subscribe(
          (mascota) => {
            // Verificar el medicamento seleccionado usando el ID validado
            this.medicamentosService.obtenerMedicamentoPorId(medicamentoId).subscribe(
              (medicamento) => {
                if (medicamento.unidades_disponibles < this.cantidad) {
                  alert(`El medicamento ${medicamento.nombre} no tiene suficientes unidades.`);
                  return;
                }

                const data = {
                  mascota: mascota,
                  veterinario: veterinario,
                  medicamento: medicamento,
                  cantidad: this.cantidad,
                };

                console.log('Datos a enviar:', JSON.stringify(data));

                // Llamar al servicio para enviar los datos
                this.tratamientoService.darTratamiento(data).subscribe(
                  (response) => {
                    alert(response.message);
                    console.log('Tratamiento registrado:', response);
                  },
                  (error) => {
                    console.error('Error al registrar el tratamiento:', error);
                    alert('Error al registrar el tratamiento.');
                  }
                );
              },
              (error) => {
                console.error('Error al obtener el medicamento:', error);
                alert('Error al obtener la información del medicamento.');
              }
            );
          },
          (error) => {
            console.error('Error al obtener la mascota:', error);
            alert('No se pudo obtener la información de la mascota.');
          }
        );
      },
      (error) => {
        console.error('Error al obtener el veterinario:', error);
        alert('No se pudo obtener la información del veterinario.');
      }
    );
  }
  
  
  
}