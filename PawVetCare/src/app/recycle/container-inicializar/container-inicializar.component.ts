import { Component } from '@angular/core';

@Component({
  selector: 'app-container-inicializar',
  templateUrl: './container-inicializar.component.html',
  styleUrls: ['./container-inicializar.component.css']
})
export class ContainerInicializarComponent {
  selectedFile: File | null = null;

  // Método que se llama cuando se selecciona un archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log(`Archivo seleccionado: ${file.name}`);
    }
  }

  // Método para manejar la subida del archivo
  onUpload() {
    if (this.selectedFile) {
      console.log('Subiendo archivo:', this.selectedFile);
      // Aquí puedes manejar la lógica de subir el archivo
    } else {
      console.log('No se ha seleccionado ningún archivo');
    }
  }
}
