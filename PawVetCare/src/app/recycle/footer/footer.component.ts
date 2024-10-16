import { Component } from '@angular/core'; // Importa el decorador Component desde Angular core

// Decorador que define el componente Footer
@Component({
  selector: 'app-footer', // Nombre del selector del componente
  templateUrl: './footer.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./footer.component.css'] // Ruta del archivo de estilos CSS del componente
})
export class FooterComponent {
  // Clase vacía para el componente Footer
}
