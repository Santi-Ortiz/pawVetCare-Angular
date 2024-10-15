// Importa el decorador Component desde el núcleo de Angular, que se utiliza para definir un componente.
import { Component } from '@angular/core';

// Utiliza el decorador @Component para definir un nuevo componente llamado HomeComponent.
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// Define la clase HomeComponent, que representa la lógica del componente.
export class HomeComponent {
  
}
