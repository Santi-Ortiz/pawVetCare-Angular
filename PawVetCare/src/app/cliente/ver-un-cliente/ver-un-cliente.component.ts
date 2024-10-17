import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-ver-un-cliente',
  templateUrl: './ver-un-cliente.component.html',
  styleUrls: ['./ver-un-cliente.component.css']
})
export class VerUnClienteComponent {
  userType = 'admin'; // Tipo de usuario, puede ser 'admin' o 'vet'
  clienteId: number | undefined; // ID del cliente
  cliente: Cliente = { // Inicializa un cliente vacío
    id: 0,
    cedula: 0,
    nombre: '',
    correo: '',
    celular: 0,
    mascotas: [],
  };

  mascotaForm: FormGroup; // Formulario para editar la información del cliente
  isEditMode: boolean = false; // Indica si el formulario está en modo de edición

  constructor(
    private fb: FormBuilder,  // Inyección de dependencia del FormBuilder
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private router: Router, // Para navegar entre rutas
    private clienteService: ClienteService  // Servicio para gestionar clientes
  ) {
    // Inicializa el formulario
    this.mascotaForm = this.fb.group({
      cedula: 0,
      nombre: '',
      correo: '',
      celular: 0,
    });
  }

  ngOnInit(): void {
    // Obtiene el ID del cliente de los parámetros de la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      alert('ID de cliente inválido.');
      return;
    }

    // Obtiene los datos del cliente según el ID
    this.clienteService.obtenerClientePorId(id).subscribe(
      (cliente: Cliente) => {
        this.cliente = cliente; // Asigna el cliente obtenido
        console.log(cliente);

        // Inicializa el formulario con los datos del cliente
        this.mascotaForm.patchValue({
          cedula: this.cliente.cedula,
          nombre: this.cliente.nombre,
          correo: this.cliente.correo,
          celular: this.cliente.celular,
        });

        this.mascotaForm.disable(); // Desactiva el formulario inicialmente
        console.log("Mascotas del cliente: ", this.cliente.mascotas);
      },
      (error) => {
        console.error(`Error al obtener el cliente con cedula ${id}:`, error);
        alert(`Cliente con cedula ${id} no encontrado`);
      }
    );
      this.clienteService.obtenerMascotasCliente(id).subscribe(
        (mascotas) => {
          this.cliente.mascotas = mascotas;
        },
        (error) => {
          console.error('Error al obtener las mascotas del cliente:', error);
        }
      );
      console.log("Mascotas del cliente: ", this.cliente.mascotas);
  }

  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn'); // Obtiene el botón de editar
    this.isEditMode = !this.isEditMode; // Alterna el modo de edición

    if (this.isEditMode) {
      this.mascotaForm.enable(); // Habilita el formulario para editar
      if (botonEditar) {
        botonEditar.classList.add('expanded'); // Añade clase para expandir el botón
        botonEditar.innerHTML = "<span class='text'>Guardar</span>"; // Cambia el texto del botón
      }
      console.log('Formulario habilitado para edición');
    } else {
      // Crea un objeto cliente actualizado con los datos del formulario
      const clienteActualizada: Cliente = {
        ...this.cliente,
        ...this.mascotaForm.value,
      };

      console.log('Cédula enviada:', clienteActualizada.cedula);

      // Valida que la cédula esté definida
      if (!clienteActualizada.cedula) {
        alert('ID de la mascota no está definido.');
        return;
      }

      // Actualiza el cliente según el tipo de usuario
      if (this.userType === 'admin') {
        this.clienteService.actualizarClienteAdmin(clienteActualizada.cedula, clienteActualizada).subscribe(
          response => {
            console.log('Cliente actualizado por el administrador:', response);
            this.router.navigate(['/clientes/todos']); // Redirige a la lista de clientes
          },
          error => {
            console.error('Error al actualizar el cliente (admin):', error);
            alert('Ocurrió un error al actualizar el cliente. Inténtalo nuevamente.');
          },
          () => {
            this.finalizeEditMode(botonEditar); // Finaliza el modo de edición
          }
        );
      } else if (this.userType === 'vet') {
        this.clienteService.actualizarClienteVet(clienteActualizada.cedula, clienteActualizada).subscribe(
          response => {
            console.log('Cliente actualizado por el veterinario:', response);
            this.router.navigate(['/clientes/todos']); // Redirige a la lista de clientes
          },
          error => {
            console.error('Error al actualizar el cliente (vet):', error);
            alert('Ocurrió un error al actualizar el cliente. Inténtalo nuevamente.');
          },
          () => {
            this.finalizeEditMode(botonEditar); // Finaliza el modo de edición
          }
        );
      }
    }
  }

  finalizeEditMode(botonEditar: HTMLElement | null): void {
    this.isEditMode = false; // Desactiva el modo de edición
    this.mascotaForm.disable(); // Desactiva el formulario
    if (botonEditar) {
      botonEditar.classList.remove('expanded'); // Remueve la clase de expansión
      botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>"; // Restablece el texto del botón
    }
  }

  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn'); // Obtiene el botón de eliminar
    // Si el botón ya está expandido, procede a eliminar el cliente
    if (botonEliminar?.classList.contains('expanded')) {
      if (this.userType === 'admin' && this.cliente.id !== undefined) {
        this.clienteService.borrarCliente(this.cliente.cedula); // Eliminar el cliente por cédula
        console.log('Cliente eliminada:', this.cliente.cedula);
        this.router.navigate(['/clientes/todos']); // Redirige a la lista de clientes
      } else if (this.userType === 'admin' && this.cliente.cedula !== undefined) {
        this.clienteService.borrarCliente(this.cliente.cedula); // Eliminar el cliente por cédula
        console.log('Cliente eliminada:', this.cliente.cedula);
        this.router.navigate(['/clientes/todos']); // Redirige a la lista de clientes
      } else {
        console.log('Error: No se pudo eliminar el Cliente');
      }
    } else {
      if (botonEliminar) {
        botonEliminar.classList.add('expanded'); // Expande el botón si no estaba expandido
      }
    }
  }
}
