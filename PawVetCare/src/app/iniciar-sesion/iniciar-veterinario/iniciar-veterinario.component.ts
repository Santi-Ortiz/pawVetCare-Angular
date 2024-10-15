import { Component } from '@angular/core';

// Decorador @Component que define el metadato del componente
@Component({
  selector: 'app-iniciar-veterinario', // Nombre del selector que se usará en las plantillas HTML
  templateUrl: './iniciar-veterinario.component.html', // Ruta del archivo HTML que define la vista del componente
  styleUrls: ['./iniciar-veterinario.component.css'] // Ruta del archivo CSS que define los estilos del componente
})
export class IniciarVeterinarioComponent {
  // Clase del componente, actualmente vacía, puede incluir lógica y propiedades en el futuro
}
