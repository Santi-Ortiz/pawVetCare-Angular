// Importa los módulos necesarios de Angular y otros servicios
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario'; // Modelo del veterinario
import { VeterinarioService } from 'src/app/services/vet.service'; // Servicio para interactuar con la API de veterinarios

@Component({
  selector: 'app-ver-un-veterinario', // Selector del componente
  templateUrl: './ver-un-veterinario.component.html', // Archivo de plantilla HTML
  styleUrls: ['./ver-un-veterinario.component.css'] // Archivo de estilos CSS
})
export class VerUnVeterinarioComponent {
  // Tipo de usuario, por defecto es 'admin'
  userType = 'admin';

  // Grupo de formulario para gestionar los datos del veterinario
  veterinarioForm: FormGroup;
  
  // Estado que indica si el componente está en modo edición
  isEditMode: boolean = false;

  // Objeto veterinario inicial con valores por defecto
  veterinario: Veterinario = {
    id: 0,
    cedula: 0,
    contrasena: '',
    foto: '',
    nombre: '',
    estado: false,
    nombreEspecialidad: '',
    tratamientos: [],
  }

  // Constructor del componente
  constructor(
    private fb: FormBuilder,  // Inyecta el servicio FormBuilder para crear formularios
    private route: ActivatedRoute, // Inyecta el servicio ActivatedRoute para acceder a los parámetros de la ruta
    private router: Router, // Inyecta el servicio Router para la navegación
    private veterinarioService: VeterinarioService  // Inyecta el servicio para gestionar veterinarios
  ) {
    // Inicializa el formulario con los campos correspondientes
    this.veterinarioForm = this.fb.group({
      nombre: [''],  // Campo para el nombre del veterinario
      cedula: [''],  // Campo para la cédula del veterinario
      contrasena: [''],  // Campo para la contraseña del veterinario
      foto: [''],  // Campo para la foto del veterinario
      estado: false,  // Campo para el estado del veterinario (activo/inactivo)
      nombreEspecialidad: [''],  // Campo para la nombreEspecialidad del veterinario
      tratamientos: ['']  // Campo para los tratamientos que puede realizar el veterinario
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtiene el ID del veterinario desde los parámetros de la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Llama al servicio para obtener los datos del veterinario por su cédula
    this.veterinarioService.getVeterinarioByCedula(id).subscribe((veterinario: Veterinario) => {
      // Asigna los datos obtenidos al objeto veterinario
      this.veterinario = veterinario;

      // Rellena el formulario con los datos del veterinario
      this.veterinarioForm.patchValue({
        nombre: this.veterinario.nombre,
        cedula: this.veterinario.cedula,
        contrasena: this.veterinario.contrasena,
        foto: this.veterinario.foto,
        nombreEspecialidad: this.veterinario.nombreEspecialidad,
        tratamientos: this.veterinario.tratamientos
      });

      // Desactiva el formulario para que no pueda ser editado al inicio
      this.veterinarioForm.disable();
    }, () => {
      // Manejo de errores: establece valores por defecto en caso de falla al obtener el veterinario
      this.veterinario = {
        id: 0,
        cedula: 0,
        contrasena: '',
        foto: '',
        nombre: '',
        estado: false,
        nombreEspecialidad: '',
        tratamientos: [],
      };
    });
  }

  // Método para alternar entre modo edición y visualización
  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn'); // Obtiene el botón de editar por su ID
    this.isEditMode = !this.isEditMode;  // Cambia el estado del modo de edición

    if (this.isEditMode) {
      // Si se activa el modo de edición
      this.veterinarioForm.enable();  // Habilita el formulario para edición

      // Cambia el estilo y el texto del botón de editar
      if (botonEditar) {
        botonEditar.classList.add('expanded');
        botonEditar.innerHTML = "<span class='text'>Guardar</span>";
      }
      console.log('Formulario habilitado para edición');
    } else {
      // Si se desactiva el modo de edición
      const veterinarioActualizado: Veterinario = {
        ...this.veterinario,  // Concatena los datos actuales del veterinario
        ...this.veterinarioForm.value  // Incluye los nuevos valores del formulario
      };

      if (this.veterinario) {
        // Llama al servicio para actualizar los datos del veterinario
        console.log(veterinarioActualizado.cedula);
        this.veterinarioService.updateVeterinario(veterinarioActualizado.cedula, veterinarioActualizado).subscribe(response => {
          console.log('Veterinario actualizado:', response);
          alert('Veterinario actualizado exitosamente'); // Muestra un mensaje de éxito
        }, error => {
          console.error('Error al actualizar el veterinario:', error); // Manejo de errores
        });
        
        console.log('Veterinario actualizado:', veterinarioActualizado);
        this.router.navigate(['/veterinarios/todos']); // Redirige a la lista de veterinarios
      }

      this.veterinarioForm.disable();  // Desactiva el formulario nuevamente
      if (botonEditar) {
        // Cambia el estilo y el texto del botón de editar
        botonEditar.classList.remove('expanded');
        botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>";
      }
    }
  }

  // Método para alternar la eliminación del veterinario
  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn'); // Obtiene el botón de eliminar por su ID
    
    if (botonEliminar?.classList.contains('expanded')) {
      // Si el botón está en estado expandido, intenta eliminar al veterinario
      if (this.veterinario && this.veterinario.id !== undefined) {
        // Llama al servicio para eliminar al veterinario
        this.veterinarioService.deleteVeterinario(this.veterinario.id).subscribe(
          response => {
            console.log('Mascota eliminada por el admin:', response);
            this.router.navigate(['/veterinarios/todos']);  // Redirige a la lista de veterinarios
          },
          error => {
            console.error('Error al eliminar el veterinario:', error); // Manejo de errores
          }
        );
      } else {
        console.log('Error: No se pudo eliminar el veterinario');
      }
    } else {
      // Si el botón no está en estado expandido, lo expande
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }
}