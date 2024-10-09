import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';
import { ClienteService } from 'src/app/services/cliente.service';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-formulario-agregar-cliente',
  templateUrl: './formulario-agregar-cliente.component.html',
  styleUrls: ['./formulario-agregar-cliente.component.css']
})
export class FormularioAgregarClienteComponent {
  @Input() 
  nuevoCliente: Cliente = {
    id: 0,
    cedula: 0,
    nombre: '',
    correo: '',
    celular: 0,
    mascotas: [],
  };

  constructor(private clienteService: ClienteService, private router: Router) {}

  agregarMascota(): void {
 
    this.clienteService.agregarCliente(this.nuevoCliente).subscribe(
      response => {
        alert('Cliente agregado exitosamente');
        
       
        this.nuevoCliente = {
          id: 0,
          cedula: 0,
          nombre: '',
          correo: '',
          celular: 0,
          mascotas: [],
        };
  
    
        this.router.navigate(['/clientes/todos']);
      },
      error => {
        console.error('Error al agregar la mascota:', error);
        alert('Ocurrió un error al agregar la mascota. Inténtalo nuevamente.');
      }
    );
  }
  
}
