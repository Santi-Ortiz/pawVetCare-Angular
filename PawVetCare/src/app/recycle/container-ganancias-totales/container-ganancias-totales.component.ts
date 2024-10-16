  import { Component } from '@angular/core';
  import { MedicamentoService } from 'src/app/services/medicamento.service';

  @Component({
    selector: 'app-container-ganancias-totales',
    templateUrl: './container-ganancias-totales.component.html',
    styleUrls: ['./container-ganancias-totales.component.css']
  })
  export class ContainerGananciasTotalesComponent {

    gananciasTotales: number = -1;

    constructor(private medicamentoService: MedicamentoService) { }

    ngOnInit(): void{
      this.medicamentoService.obtenerGananciasTotales().subscribe(
        (ganancias: number) => {
          this.gananciasTotales = ganancias;  
        },
        (error) => {
          console.error("Error al obtener las ganancias totales: ", error);
        }

      );
    }
  }
