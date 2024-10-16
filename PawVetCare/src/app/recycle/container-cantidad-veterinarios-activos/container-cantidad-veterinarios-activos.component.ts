import { Component } from '@angular/core';
import { VeterinarioService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-container-cantidad-veterinarios-activos',
  templateUrl: './container-cantidad-veterinarios-activos.component.html',
  styleUrls: ['./container-cantidad-veterinarios-activos.component.css']
})
export class ContainerCantidadVeterinariosActivosComponent {

  totalVeterinariosActivos: number = 0;
  
  constructor(private veterinarioService: VeterinarioService) { }

  ngOnInit(): void {
    this.veterinarioService.contarVeterinariosActivos().subscribe(
      (cantidad: number) => {
        this.totalVeterinariosActivos = cantidad;
      },
      (error) => {
        console.error("Error al obtener la cantidad de veterinarios activos: ", error);
      }
    )
  }

}
