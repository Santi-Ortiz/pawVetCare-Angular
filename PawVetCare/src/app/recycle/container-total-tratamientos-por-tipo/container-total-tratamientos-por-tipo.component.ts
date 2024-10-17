import { Component, ElementRef, ViewChild } from '@angular/core'; // Importa Component, ElementRef y ViewChild desde Angular core
import { Router } from '@angular/router'; // Importa Router para la navegación entre rutas
import { Mascota } from 'src/app/model/mascota'; // Importa el modelo Mascota
import { Medicamento } from 'src/app/model/medicamento'; // Importa el modelo Medicamento
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio para manejar mascotas
import { TratamientoMedicamentoService } from 'src/app/services/tratamientoMedicamento.service'; // Importa el servicio para manejar tratamientos y medicamentos

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
  topTratamientos: any[] = [];

  constructor(private tratamientomedicamentoService: TratamientoMedicamentoService) { }

  ngOnInit(): void {
    this.getTopTratamientos(); // Llamamos al servicio cuando el componente se inicializa
  }

  getTopTratamientos(): void {
    this.tratamientomedicamentoService.getTratamientosPorMedicamentos().subscribe({
      next: (data) => {
        this.topTratamientos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
