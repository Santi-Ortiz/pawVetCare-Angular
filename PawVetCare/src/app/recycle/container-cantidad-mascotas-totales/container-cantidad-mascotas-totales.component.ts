import { Component } from '@angular/core'; // Importa el decorador Component de Angular
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio MascotasService para gestionar operaciones relacionadas con mascotas

@Component({
  selector: 'app-container-cantidad-mascotas-totales', // Selector del componente, utilizado para integrarlo en plantillas HTML
  templateUrl: './container-cantidad-mascotas-totales.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./container-cantidad-mascotas-totales.component.css'] // Ruta al archivo CSS que define los estilos del componente
})
export class ContainerCantidadMascotasTotalesComponent {

  totalMascotas: number = 0; // Inicializa la variable totalMascotas en 0

  constructor(private mascotasService: MascotasService) { } // Inyecta el servicio MascotasService en el constructor

  ngOnInit(): void { // Método del ciclo de vida que se ejecuta al inicializar el componente
    this.mascotasService.contarTotalMascotas().subscribe( // Llama al método contarTotalMascotas del servicio y suscribe a los resultados
      (cantidad: number) => { // Callback que maneja el resultado exitoso de la suscripción
        this.totalMascotas = cantidad; // Asigna el valor recibido a la variable totalMascotas
      },
      (error) => { // Callback que maneja errores durante la solicitud
        console.error("Error al obtener la cantidad de mascotas: ", error); // Muestra un mensaje de error en la consola
      }
    )
  }

}
