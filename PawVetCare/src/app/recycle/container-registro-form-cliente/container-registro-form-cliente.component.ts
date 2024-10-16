import { Component } from '@angular/core'; // Importa el decorador Component de Angular para definir un componente

// Decorador que define el componente
@Component({
  selector: 'app-container-registro-form-cliente', // Selector del componente que se usará en el HTML
  templateUrl: './container-registro-form-cliente.component.html', // Ruta del archivo HTML asociado al componente
  styleUrls: ['./container-registro-form-cliente.component.css'] // Ruta del archivo CSS asociado al componente
})
// Clase que define el componente
export class ContainerRegistroFormClienteComponent {
  // Esta clase puede contener lógica y propiedades relacionadas con el formulario de registro del cliente
}
