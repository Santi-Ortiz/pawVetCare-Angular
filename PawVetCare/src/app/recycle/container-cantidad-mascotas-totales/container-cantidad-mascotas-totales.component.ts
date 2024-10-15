import { Component } from '@angular/core';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-container-cantidad-mascotas-totales',
  templateUrl: './container-cantidad-mascotas-totales.component.html',
  styleUrls: ['./container-cantidad-mascotas-totales.component.css']
})
export class ContainerCantidadMascotasTotalesComponent {

  totalMascotas: number = 0;
  
  constructor(private mascotasService: MascotasService) { }

  ngOnInit(): void {
    this.mascotasService.contarTotalMascotas().subscribe(
      (cantidad: number) => {
        this.totalMascotas = cantidad;
      },
      (error) => {
        console.error("Error al obtener la cantidad de mascotas: ", error);
      }
    )
  }

}
