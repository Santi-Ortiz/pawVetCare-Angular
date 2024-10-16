import { Component } from '@angular/core'; // Importa el decorador Component desde Angular core, que se utiliza para definir un componente.

@Component({
  selector: 'app-container-ganancias-totales', // Define el selector del componente, que se usará en las plantillas HTML.
  templateUrl: './container-ganancias-totales.component.html', // Especifica la ruta del archivo de plantilla HTML asociado a este componente.
  styleUrls: ['./container-ganancias-totales.component.css'] // Define la ruta del archivo CSS que contiene los estilos para este componente.
})
export class ContainerGananciasTotalesComponent {
  // Esta clase representa el componente de Angular que se encarga de mostrar las ganancias totales.
  // Actualmente, no contiene lógica adicional ni propiedades.
}
