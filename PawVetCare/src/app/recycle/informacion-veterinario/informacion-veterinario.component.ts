import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario'; // Importa el modelo 'Veterinario'
import { VeterinarioService } from 'src/app/services/vet.service'; // Servicio para realizar operaciones relacionadas con 'Veterinario'

@Component({
  selector: 'app-informacion-veterinario', // Define el selector del componente
  templateUrl: './informacion-veterinario.component.html', // Enlaza el archivo de plantilla HTML
  styleUrls: ['./informacion-veterinario.component.css'] // Enlaza el archivo CSS para los estilos
})
export class InformacionVeterinarioComponent {
  especialidades = [
    { ID: 1, NOMBRE_ESPECIALIDAD: 'Cardiología' },
    { ID: 3, NOMBRE_ESPECIALIDAD: 'Dermatología' },
    { ID: 7, NOMBRE_ESPECIALIDAD: 'Neurología' },
    { ID: 2, NOMBRE_ESPECIALIDAD: 'Nutrición' },
    { ID: 4, NOMBRE_ESPECIALIDAD: 'Oncología' },
    { ID: 6, NOMBRE_ESPECIALIDAD: 'Parasitología' },
    { ID: 5, NOMBRE_ESPECIALIDAD: 'Toxicología' },
    { ID: 8, NOMBRE_ESPECIALIDAD: 'Cirugía' }
  ];
  // Define el tipo de usuario, aquí se establece como 'admin'
  userType = 'admin';

  // Input para recibir datos desde el componente padre
  @Input() veterinarioForm!: FormGroup; // Formulario reactivo del veterinario
  @Input() veterinario: any;  // Objeto que contiene los datos del veterinario
  @Input() isEditMode!: boolean;  // Controla si el formulario está en modo edición

  constructor(
    private fb: FormBuilder,  // Servicio para construir el formulario reactivo
    private route: ActivatedRoute, // Servicio para obtener la información de la ruta activa
    private router: Router, // Servicio para navegar entre rutas
    private veterinarioService: VeterinarioService  // Servicio personalizado para gestionar veterinarios
  ) {
    // Inicialización del formulario con campos vacíos
    this.veterinarioForm = this.fb.group({
      nombre: [''],
      cedula: [''],
      contrasena: [''],
      foto: [''],
      nombreEspecialidad: [''],
      tratamientos: ['']
    });
  }

  // Se ejecuta cuando el componente es inicializado
  ngOnInit(): void {
    // Si hay un veterinario disponible, sus valores se asignan al formulario
    if (this.veterinario) {
      this.veterinarioForm.patchValue(this.veterinario);
  
      // Asigna la especialidad actual del veterinario al campo correspondiente
      this.veterinarioForm.patchValue({
        nombreEspecialidad: this.veterinario.nombreEspecialidad
      });
    }
  }
  

  // Método para alternar el modo edición
  toggleEditMode(): void {
    const botonEditar = document.getElementById('editarBtn');
    this.isEditMode = !this.isEditMode; // Invierte el estado del modo edición

    if (this.isEditMode) {
      // Si el formulario está en modo edición, habilita los campos y cambia el botón
      this.veterinarioForm.enable();
      if (botonEditar) {
        botonEditar.classList.add('expanded');
        botonEditar.innerHTML = "<span class='text'>Guardar</span>";
      }
      console.log('Formulario habilitado para edición');
    } else {
      // Si se desactiva el modo edición, guarda los cambios y deshabilita el formulario
      const veterinarioActualizado: Veterinario = {
        ...this.veterinario,
        ...this.veterinarioForm.value, // Combina los valores del formulario con el objeto existente
      };

      if (this.veterinario) {
        // Actualiza el veterinario utilizando el servicio correspondiente
        this.veterinarioService.updateVeterinario(this.veterinario.cedula, veterinarioActualizado).subscribe(
          (response: String) => { 
            console.log('Veterinario actualizado correctamente', response);
            this.router.navigate(['/veterinarios/todos']); // Redirige a la lista de veterinarios
          },
          (error) => {
            console.error('Error al actualizar el veterinario:', error);
            alert('Hubo un error al actualizar el veterinario. Inténtalo nuevamente más tarde.');
          }
        );
      }

      this.veterinarioForm.disable(); // Deshabilita el formulario tras guardar los cambios
      if (botonEditar) {
        botonEditar.classList.remove('expanded');
        botonEditar.innerHTML = "<span class='icon'>✎</span><span class='text'>Editar todo</span>";
      }
    }
  }

  // Método para alternar el estado del botón eliminar y eliminar al veterinario
  toggleEliminar(): void {
    const botonEliminar = document.getElementById('eliminarBtn');
    
    if (botonEliminar?.classList.contains('expanded')) {
      // Si el botón está expandido, realiza la acción de eliminar
      if (this.veterinario && this.veterinario.id !== undefined) {
        // Elimina el veterinario utilizando el servicio correspondiente
        this.veterinarioService.deleteVeterinario(this.veterinario.cedula).subscribe(
          (response) => {
            console.log('Veterinario eliminado:', this.veterinario?.cedula);
            console.log('Veterinario actualizado correctamente', response);
            alert('Veterinario eliminado exitosamente');
            this.router.navigate(['/veterinarios/todos']);  // Redirige a la lista de veterinarios
          },
          error => {
            console.error('Error al eliminar el veterinario:', error);
            alert('Hubo un error al eliminar el veterinario. Inténtalo nuevamente más tarde.');
          }
        );
      } else {
        console.log('Error: No se pudo eliminar el veterinario');
        alert('Error: No se encontró el veterinario para eliminar.');
      }
    } else {
      // Si el botón no está expandido, solo cambia su estado visual
      if (botonEliminar) {
        botonEliminar.classList.add('expanded');
      }
    }
  }
}