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
  userType = 'admin';
  clienteId: number | undefined;
  cliente: Cliente = {
    id: 0,
    cedula: 0,
    nombre: '',
    correo: '',
    celular: 0,
    mascotas: [],
  };

  mascotaForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,  
    private route: ActivatedRoute, 
    private router: Router,
    private clienteService: ClienteService  
  ) {
    this.mascotaForm = this.fb.group({
      cedula: 0,
      nombre: '',
      correo: '',
      celular: 0,
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      alert('ID de cliente inválido.');
      return;
    }

    this.clienteService.obtenerClientePorId(id).subscribe(
      (cliente: Cliente) => {
        this.cliente = cliente;
        console.log(cliente);

        // Inicializa el formulario con los datos del cliente
        this.mascotaForm.patchValue({
          cedula: this.cliente.cedula,
          nombre: this.cliente.nombre,
          correo: this.cliente.correo,
          celular: this.cliente.celular,
        });

        this.mascotaForm.disable();
      },
      (error) => {
        console.error(`Error al obtener el cliente con cedula ${id}:`, error);
        alert(`Cliente con cedula ${id} no encontrado`);
      }
    );
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
    // Si el botón ya está expandido, procede a eliminar la mascota
    if (botonEliminar?.classList.contains('expanded')) {
      if (this.userType === 'admin' && this.cliente.id !== undefined) {
        this.clienteService.borrarCliente(this.cliente.cedula);  // Eliminar la mascota por ID
        console.log('Cliente eliminada:', this.cliente.cedula);
        this.router.navigate(['/clientes/todos']);  // Redirigir a la lista de mascotas
      } else if(this.userType === 'admin' && this.cliente.cedula !== undefined){
        this.clienteService.borrarCliente(this.cliente.cedula);  // Eliminar la mascota por ID
        console.log('Cliente eliminada:', this.cliente.cedula);
        this.router.navigate(['/clientes/todos']);  // Redirigir a la lista de mascotas
      } else {
        console.log('Error: No se pudo eliminar el Cliente');
      }
    } else {
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }
  
}
