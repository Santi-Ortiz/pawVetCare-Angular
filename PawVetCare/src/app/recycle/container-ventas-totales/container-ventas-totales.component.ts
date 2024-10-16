import { Component } from '@angular/core'; // Importa el decorador Component desde Angular core

// Decorador que define un componente Angular
@Component({
  selector: 'app-container-ventas-totales', // Selector que se usará en el HTML para incluir este componente
  templateUrl: './container-ventas-totales.component.html', // Ruta del archivo HTML que contiene la plantilla del componente
  styleUrls: ['./container-ventas-totales.component.css'] // Ruta del archivo CSS que contiene los estilos del componente
})
export class ContainerVentasTotalesComponent { // Clase del componente que encapsula la lógica y propiedades
  // No hay propiedades ni métodos definidos en este componente por ahora
}
