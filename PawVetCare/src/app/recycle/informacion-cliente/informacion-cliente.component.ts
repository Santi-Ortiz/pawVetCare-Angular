import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-informacion-cliente',
  templateUrl: './informacion-cliente.component.html',
  styleUrls: ['./informacion-cliente.component.css']
})
export class InformacionClienteComponent {
  userType = 'admin';

  @Input() cliente!: Cliente;
  @Input() mascotaForm!: FormGroup;
  @Input() isEditMode!: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {
    this.mascotaForm = this.fb.group({
      cedula: [''],
      nombre: [''],
      correo: [''],
      celular: ['']
    });
  }

  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn');
    this.isEditMode = !this.isEditMode;
  
    if (this.isEditMode) {
      this.mascotaForm.enable();
      if (botonEditar) {
        botonEditar.classList.add('expanded');
        botonEditar.innerHTML = "<span class='text'>Guardar</span>";
      }
      console.log('Formulario habilitado para edición');
    } else {
      const clienteActualizada: Cliente = {
        ...this.cliente,
        ...this.mascotaForm.value,
      };
  
     
      console.log('Cédula enviada:', clienteActualizada.cedula);

      
      if (!clienteActualizada.cedula) {
        alert('ID de la mascota no está definido.');
        return;
      }

      if (this.userType === 'admin') {
        this.clienteService.actualizarClienteAdmin(clienteActualizada.cedula, clienteActualizada).subscribe(
          response => {
            console.log('Mascota actualizada por el administrador:', response);
            this.router.navigate(['/clientes/todos']);
          },
          error => {
            console.error('Error al actualizar la mascota (admin):', error);
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.');
          },
          () => {
            this.finalizeEditMode(botonEditar);  
          }
        );
      } else if (this.userType === 'vet') {
        this.clienteService.actualizarClienteVet(clienteActualizada.cedula, clienteActualizada).subscribe(
          response => {
            console.log('Mascota actualizada por el veterinario:', response);
            this.router.navigate(['/clientes/todos']);
          },
          error => {
            console.error('Error al actualizar la mascota (vet):', error);
            alert('Ocurrió un error al actualizar la mascota. Inténtalo nuevamente.');
          },
          () => {
            this.finalizeEditMode(botonEditar);  
          }
        );
      }
    }
  }

  finalizeEditMode(botonEditar: HTMLElement | null): void {
    this.isEditMode = false;
    this.mascotaForm.disable();
    if (botonEditar) {
      botonEditar.classList.remove('expanded');
      botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>";
    }
  }

  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn');
  
    // Verificar si el botón ya está expandido
    if (botonEliminar?.classList.contains('expanded')) {
      // Verificar si el cliente existe y tiene un ID válido
      if (this.cliente && this.cliente.cedula !== undefined) {
        this.clienteService.borrarCliente(this.cliente.cedula).subscribe(
          response => {
            console.log('Cliente eliminado:', this.cliente.cedula);
            alert('Cliente eliminado exitosamente');
            this.router.navigate(['/clientes/todos']); // Redirigir después de la eliminación
          },
          error => {
            console.error('Error al eliminar el cliente:', error);
            alert('Hubo un error al eliminar el cliente. Inténtalo nuevamente más tarde.');
          }
        );
      } else {
        // Cliente no válido o no encontrado
        console.log('Error: No se pudo eliminar el cliente');
        alert('Error: No se encontró el cliente para eliminar.');
      }
    } else {
      // Si el botón no está expandido, expandirlo
      botonEliminar?.classList.add('expanded');
    }
  }
  
}
