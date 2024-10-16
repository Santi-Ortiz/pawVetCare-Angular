import { Component } from '@angular/core'; // Importa el decorador Component de Angular
import { VeterinarioService } from 'src/app/services/vet.service'; // Importa el servicio VeterinarioService para interactuar con la API

@Component({
  selector: 'app-container-cantidad-veterinarios-activos', // Selector para usar este componente en plantillas HTML
  templateUrl: './container-cantidad-veterinarios-activos.component.html', // Archivo HTML asociado al componente
  styleUrls: ['./container-cantidad-veterinarios-activos.component.css'] // Archivo CSS para estilos del componente
})
export class ContainerCantidadVeterinariosActivosComponent {

  totalVeterinariosActivos: number = 0; // Inicializa la variable que almacenará la cantidad total de veterinarios activos
  
  constructor(private veterinarioService: VeterinarioService) { } // Constructor que inyecta el servicio VeterinarioService

  ngOnInit(): void { // Método que se ejecuta al inicializar el componente
    this.veterinarioService.contarVeterinariosActivos().subscribe( // Llama al método para contar veterinarios activos y se suscribe a los resultados
      (cantidad: number) => { // Función que maneja el valor devuelto de la API
        this.totalVeterinariosActivos = cantidad; // Asigna el valor recibido a la variable totalVeterinariosActivos
      },
      (error) => { // Función que maneja cualquier error en la llamada a la API
        console.error("Error al obtener la cantidad de veterinarios activos: ", error); // Muestra el error en la consola
      }
    )
  }
}
