import { Component } from '@angular/core';

// Decorador que define un componente Angular
@Component({
  selector: 'app-container-ventas-totales', // Selector que se usará en el HTML para incluir este componente
  templateUrl: './container-ventas-totales.component.html', // Ruta del archivo HTML que contiene la plantilla del componente
  styleUrls: ['./container-ventas-totales.component.css'] // Ruta del archivo CSS que contiene los estilos del componente
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
