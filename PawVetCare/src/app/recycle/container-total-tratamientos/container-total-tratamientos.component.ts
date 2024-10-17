import { Component } from '@angular/core'; // Importa el decorador Component desde Angular core
import { TratamientoService } from 'src/app/services/tratamiento.service';

// Decorador que define el componente
@Component({
  selector: 'app-container-total-tratamientos', // Selector del componente para su uso en HTML
  templateUrl: './container-total-tratamientos.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./container-total-tratamientos.component.css'] // Ruta del archivo de estilos CSS
})
export class ContainerTotalTratamientosComponent {

  totalTratamientos = -1;

  constructor(private tratamientosService: TratamientoService) { }

  ngOnInit(): void {
    this.tratamientosService.obtenerTotalTratamientosUltimoMes().subscribe(
      (total: number) => {
        this.totalTratamientos = total;
      },
      (error) => {
        console.error("Error al obtener el total de tratamientos del último mes: ", error);
      }
    )
  }
}
