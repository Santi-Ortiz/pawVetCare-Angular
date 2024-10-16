// Importación del decorador Component desde Angular core
import { Component } from '@angular/core';

// Decorador que define el componente y sus metadatos
@Component({
  // Selector del componente, se usará en otras plantillas para referenciarlo
  selector: 'app-container-sesion-veterinario',
  // Ruta del archivo HTML que define la plantilla del componente
  templateUrl: './container-sesion-veterinario.component.html',
  // Ruta del archivo CSS que contiene los estilos del componente
  styleUrls: ['./container-sesion-veterinario.component.css']
})

// Clase que define la lógica del componente
export class ContainerSesionVeterinarioComponent {
  // Aquí se puede agregar la lógica relacionada con la sesión del veterinario
}

