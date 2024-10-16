import { Component, Input } from '@angular/core'; // Importa Component e Input desde Angular core
import { Router } from '@angular/router'; // Importa Router para la navegación entre rutas
import { Cliente } from 'src/app/model/cliente'; // Importa el modelo Cliente
import { Mascota } from 'src/app/model/mascota'; // Importa el modelo Mascota (aunque no se utiliza en este componente)
import { ClienteService } from 'src/app/services/cliente.service'; // Importa el servicio para manejar clientes
import { MascotasService } from 'src/app/services/mascotas.service'; // Importa el servicio para manejar mascotas (aunque no se utiliza en este componente)

@Component({
  selector: 'app-formulario-agregar-cliente', // Selector para usar este componente en otras plantillas
  templateUrl: './formulario-agregar-cliente.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./formulario-agregar-cliente.component.css'] // Ruta al archivo de estilos CSS
})
export class FormularioAgregarClienteComponent {
  @Input() // Decorador para recibir datos de un componente padre
  nuevoCliente: Cliente = { // Inicializa un nuevo cliente con valores por defecto
    id: 0, // ID del cliente, se establece en 0 inicialmente
    cedula: 0, // Cédula del cliente, se establece en 0 inicialmente
    nombre: '', // Nombre del cliente, se establece como cadena vacía
    correo: '', // Correo electrónico del cliente, se establece como cadena vacía
    celular: 0, // Número de celular del cliente, se establece en 0 inicialmente
    mascotas: [], // Lista de mascotas del cliente, se inicializa como un array vacío
  };

  // Constructor que inyecta el servicio de clientes y el router para la navegación
  constructor(private clienteService: ClienteService, private router: Router) {}

  // Método para agregar una nueva mascota
  agregarMascota(): void {
    // Llama al servicio de cliente para agregar el nuevo cliente
    this.clienteService.agregarCliente(this.nuevoCliente).subscribe(
      response => { // Callback para manejar la respuesta exitosa
        alert('Cliente agregado exitosamente'); // Alerta de éxito al agregar el cliente
        
        // Reinicializa nuevoCliente a sus valores por defecto
        this.nuevoCliente = {
          id: 0, // Restablece el ID a 0
          cedula: 0, // Restablece la cédula a 0
          nombre: '', // Restablece el nombre a cadena vacía
          correo: '', // Restablece el correo a cadena vacía
          celular: 0, // Restablece el celular a 0
          mascotas: [], // Restablece la lista de mascotas a un array vacío
        };
  
        // Navega a la ruta '/clientes/todos' después de agregar el cliente
        this.router.navigate(['/clientes/todos']);
      },
      error => { // Callback para manejar errores
        console.error('Error al agregar la mascota:', error); // Imprime el error en la consola
        alert('Ocurrió un error al agregar la mascota. Inténtalo nuevamente.'); // Alerta de error
      }
    );
  }
}
