import { Component } from '@angular/core';
import { VeterinarioService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-container-cantidad-veterinarios-inactivos',
  templateUrl: './container-cantidad-veterinarios-inactivos.component.html',
  styleUrls: ['./container-cantidad-veterinarios-inactivos.component.css']
})
export class ContainerCantidadVeterinariosInactivosComponent {

  totalVeterinariosInactivos: number = 0;

  constructor(private veterinarioService: VeterinarioService) { }

  ngOnInit(): void {
    this.veterinarioService.contarVeterinariosInactivos().subscribe(
      (cantidad: number) => {
        this.totalVeterinariosInactivos = cantidad;
      },
      (error) => {
        console.error("Error al obtener la cantidad de veterinarios inactivos: ", error);
      }
    )

  }

}
