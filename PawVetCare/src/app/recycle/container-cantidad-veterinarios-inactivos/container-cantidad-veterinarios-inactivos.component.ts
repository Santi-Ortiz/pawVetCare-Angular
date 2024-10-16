import { Component } from '@angular/core'; // Importa el decorador Component para crear un componente de Angular
import { VeterinarioService } from 'src/app/services/vet.service'; // Importa el servicio VeterinarioService para interactuar con la API de veterinarios

@Component({
  selector: 'app-container-cantidad-veterinarios-inactivos', // Selector del componente que se usará en la plantilla HTML
  templateUrl: './container-cantidad-veterinarios-inactivos.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./container-cantidad-veterinarios-inactivos.component.css'] // Ruta al archivo de estilos CSS
})
export class ContainerCantidadVeterinariosInactivosComponent {

  totalVeterinariosInactivos: number = 0; // Variable para almacenar la cantidad total de veterinarios inactivos

  constructor(private veterinarioService: VeterinarioService) { } // Inyección del servicio VeterinarioService a través del constructor

  ngOnInit(): void { // Método del ciclo de vida que se ejecuta al inicializar el componente
    this.veterinarioService.contarVeterinariosInactivos().subscribe( // Llama al método del servicio que cuenta los veterinarios inactivos
      (cantidad: number) => { // Maneja la respuesta del servicio
        this.totalVeterinariosInactivos = cantidad; // Asigna la cantidad recibida a la variable totalVeterinariosInactivos
      },
      (error) => { // Manejo de errores en caso de que la llamada al servicio falle
        console.error("Error al obtener la cantidad de veterinarios inactivos: ", error); // Muestra un mensaje de error en la consola
      }
    )
  }
}
