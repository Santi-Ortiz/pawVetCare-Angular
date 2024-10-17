import { Tratamiento } from "./tratamiento";

export interface Veterinario {
    id: number;
    cedula: number;
    contrasena: string;
    foto: string;
    nombre: string;
    estado: boolean;
    nombreEspecialidad: string;
    // nombreEspecialidad: Especialidad;
    tratamientos: Tratamiento[];
  }
  