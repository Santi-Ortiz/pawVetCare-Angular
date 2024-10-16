import { Component } from '@angular/core'; // Importa el decorador Component de Angular para definir un componente
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio MascotasService que manejará la lógica de las mascotas

@Component({
  selector: 'app-container-cantidad-mascotas-activas', // Define el selector del componente que se usará en HTML
  templateUrl: './container-cantidad-mascotas-activas.component.html', // Especifica la ruta del archivo HTML asociado al componente
  styleUrls: ['./container-cantidad-mascotas-activas.component.css'] // Especifica la ruta del archivo CSS asociado al componente
})
export class ContainerCantidadMascotasActivasComponent {
  
  mascotasActivas: number = 0; // Inicializa la propiedad mascotasActivas para almacenar el número de mascotas activas

  // Constructor que inyecta el servicio MascotasService para usarlo en el componente
  constructor(private mascotasService: MascotasService) { }

  // Método del ciclo de vida que se llama después de que el componente ha sido inicializado
  ngOnInit(): void {
    // Llama al método contarMascotasActivas del servicio para obtener la cantidad de mascotas activas
    this.mascotasService.contarMascotasActivas().subscribe(
      (cantidad: number) => { // Maneja la respuesta del servicio
        this.mascotasActivas = cantidad; // Asigna la cantidad obtenida a la propiedad mascotasActivas
      },
      (error) => { // Maneja cualquier error que ocurra durante la llamada al servicio
        console.error("Error al obtener la cantidad de mascotas activas: ", error); // Imprime el error en la consola
      }
    )
  }
}
