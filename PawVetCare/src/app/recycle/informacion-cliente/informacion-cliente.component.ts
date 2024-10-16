import { Component, Input } from '@angular/core'; // Importa Component e Input para crear un componente y recibir propiedades
import { FormBuilder, FormGroup } from '@angular/forms'; // Importa FormBuilder y FormGroup para crear formularios reactivos
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute y Router para manejar la navegación
import { Cliente } from 'src/app/model/cliente'; // Importa el modelo Cliente
import { ClienteService } from 'src/app/services/cliente.service'; // Importa el servicio ClienteService para manejar operaciones de cliente
import { MascotasService } from 'src/app/services/mascotas.service'; // (Importación no utilizada en este componente)

@Component({
  selector: 'app-informacion-cliente', // Selector del componente para su uso en plantillas
  templateUrl: './informacion-cliente.component.html', // Ruta a la plantilla HTML del componente
  styleUrls: ['./informacion-cliente.component.css'] // Ruta a los estilos CSS del componente
})
export class InformacionClienteComponent {
  userType = 'admin'; // Tipo de usuario, por defecto es 'admin'

  @Input() cliente!: Cliente; // Recibe un objeto Cliente como entrada
  @Input() mascotaForm!: FormGroup; // Recibe un FormGroup como entrada para manejar el formulario de la mascota
  @Input() isEditMode!: boolean; // Indica si el formulario está en modo de edición

  constructor(
    private fb: FormBuilder, // Inyecta FormBuilder para crear formularios
    private route: ActivatedRoute, // Inyecta ActivatedRoute para obtener información sobre la ruta activa
    private router: Router, // Inyecta Router para manejar la navegación
    private clienteService: ClienteService // Inyecta ClienteService para realizar operaciones relacionadas con clientes
  ) {
    // Inicializa el formulario con controles para cedula, nombre, correo y celular
    this.mascotaForm = this.fb.group({
      cedula: [''], // Control para la cédula
      nombre: [''], // Control para el nombre
      correo: [''], // Control para el correo
      celular: [''] // Control para el celular
    });
  }

  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn'); // Obtiene el botón de editar por su ID
    this.isEditMode = !this.isEditMode; // Cambia el estado de edición

    if (this.isEditMode) {
      this.mascotaForm.enable(); // Habilita el formulario para edición
      if (botonEditar) {
        botonEditar.classList.add('expanded'); // Agrega clase para expandir el botón
        botonEditar.innerHTML = "<span class='text'>Guardar</span>"; // Cambia el texto del botón a "Guardar"
      }
      console.log('Formulario habilitado para edición'); // Mensaje de depuración
    } else {
      // Crea un nuevo objeto Cliente con los valores del formulario
      const clienteActualizada: Cliente = {
        ...this.cliente,
        ...this.mascotaForm.value,
      };

      console.log('Cédula enviada:', clienteActualizada.cedula); // Mensaje de depuración

      // Verifica si la cédula está definida
      if (!clienteActualizada.cedula) {
        alert('ID de la mascota no está definido.'); // Alerta si la cédula no está presente
        return; // Sale de la función si no hay cédula
      }

      // Actualiza el cliente dependiendo del tipo de usuario
      if (this.userType === 'admin') {
        this.clienteService.actualizarClienteAdmin(clienteActualizada.cedula, clienteActualizada).subscribe(
          response => {
            console.log('Mascota actualizada por el administrador:', response); // Mensaje de depuración
            this.router.navigate(['/clientes/todos']); // Redirige a la lista de clientes
          },
          error => {
            console.error('Error al actualizar la mascota (admin):', error); // Mensaje de error en consola
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.'); // Alerta de error
          },
          () => {
            this.finalizeEditMode(botonEditar);  // Finaliza el modo de edición
          }
        );
      } else if (this.userType === 'vet') {
        this.clienteService.actualizarClienteVet(clienteActualizada.cedula, clienteActualizada).subscribe(
          response => {
            console.log('Mascota actualizada por el veterinario:', response); // Mensaje de depuración
            this.router.navigate(['/clientes/todos']); // Redirige a la lista de clientes
          },
          error => {
            console.error('Error al actualizar la mascota (vet):', error); // Mensaje de error en consola
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.'); // Alerta de error
          },
          () => {
            this.finalizeEditMode(botonEditar);  // Finaliza el modo de edición
          }
        );
      }
    }
  }

  finalizeEditMode(botonEditar: HTMLElement | null): void {
    this.isEditMode = false; // Cambia el modo de edición a falso
    this.mascotaForm.disable(); // Deshabilita el formulario
    if (botonEditar) {
      botonEditar.classList.remove('expanded'); // Remueve la clase de expansión del botón
      botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>"; // Restablece el texto del botón
    }
  }

  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn'); // Obtiene el botón de eliminar por su ID
  
    // Verifica si el botón ya está expandido
    if (botonEliminar?.classList.contains('expanded')) {
      // Verifica si el cliente existe y tiene un ID válido
      if (this.cliente && this.cliente.cedula !== undefined) {
        this.clienteService.borrarCliente(this.cliente.cedula).subscribe(
          response => {
            console.log('Cliente eliminado:', this.cliente.cedula); // Mensaje de depuración
            alert('Cliente eliminado exitosamente'); // Alerta de éxito
            this.router.navigate(['/clientes/todos']); // Redirige a la lista de clientes
          },
          error => {
            console.error('Error al eliminar el cliente:', error); // Mensaje de error en consola
            alert('Hubo un error al eliminar el cliente. Inténtalo nuevamente más tarde.'); // Alerta de error
          }
        );
      } else {
        // Cliente no válido o no encontrado
        console.log('Error: No se pudo eliminar el cliente'); // Mensaje de error en consola
        alert('Error: No se encontró el cliente para eliminar.'); // Alerta de error
      }
    } else {
      // Si el botón no está expandido, expandirlo
      botonEliminar?.classList.add('expanded'); // Agrega la clase para expandir el botón
    }
  }
  
}
