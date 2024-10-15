import { Component } from '@angular/core';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-container-cantidad-mascotas-activas',
  templateUrl: './container-cantidad-mascotas-activas.component.html',
  styleUrls: ['./container-cantidad-mascotas-activas.component.css']
})
export class ContainerCantidadMascotasActivasComponent {

  mascotasActivas: number = 0;
  
  constructor(private mascotasService: MascotasService) { }

  ngOnInit(): void {
    this.mascotasService.contarMascotasActivas().subscribe(
      (cantidad: number) => {
        this.mascotasActivas = cantidad;
      },
      (error) => {
        console.error("Error al obtener la cantidad de mascotas activas: ", error);
      }
    )
  }
}
