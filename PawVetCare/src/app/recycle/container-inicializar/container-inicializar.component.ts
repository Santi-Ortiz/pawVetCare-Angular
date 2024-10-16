import { Component } from '@angular/core'; // Importa el decorador Component desde Angular core

@Component({
  selector: 'app-container-inicializar', // Selector que se usará para referenciar este componente en HTML
  templateUrl: './container-inicializar.component.html', // Archivo de plantilla HTML asociado a este componente
  styleUrls: ['./container-inicializar.component.css'] // Archivo de estilos CSS asociado a este componente
})
export class ContainerInicializarComponent {
  selectedFile: File | null = null; // Variable que almacenará el archivo seleccionado por el usuario

  // Método que se llama cuando se selecciona un archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Obtiene el primer archivo seleccionado del evento
    if (file) { // Verifica si se ha seleccionado un archivo
      this.selectedFile = file; // Asigna el archivo seleccionado a la variable selectedFile
      console.log(`Archivo seleccionado: ${file.name}`); // Muestra el nombre del archivo seleccionado en la consola
    }
  }

  // Método para manejar la subida del archivo
  onUpload() {
    if (this.selectedFile) { // Verifica si hay un archivo seleccionado
      console.log('Subiendo archivo:', this.selectedFile); // Muestra información sobre el archivo que se está subiendo
      // Aquí puedes manejar la lógica de subir el archivo
    } else {
      console.log('No se ha seleccionado ningún archivo'); // Mensaje de error si no se ha seleccionado ningún archivo
    }
  }
}
