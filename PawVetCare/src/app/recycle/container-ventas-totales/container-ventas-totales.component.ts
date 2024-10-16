import { Component } from '@angular/core';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-container-ventas-totales',
  templateUrl: './container-ventas-totales.component.html',
  styleUrls: ['./container-ventas-totales.component.css']
})
export class ContainerVentasTotalesComponent {

  ventasTotales: number = -1;

  constructor(private medicamentoService: MedicamentoService) { }

  ngOnInit(): void{
    this.medicamentoService.obtenerVentasTotales().subscribe(
      (ventas: number) => {
        this.ventasTotales = ventas;
      },
      (error) =>{
        console.error("Error al obtener las ventas totales: ", error);
      });
  }

}
