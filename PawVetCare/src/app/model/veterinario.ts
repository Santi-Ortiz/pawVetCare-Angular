import { Especialidad } from "./especialidad";
import { Tratamiento } from "./tratamiento";

export interface Veterinario {
    id: number;
    cedula: number;
    contrasena: string;
    foto: string;
    nombre: string;
    estado: boolean;
    especialidad: Especialidad;
    tratamientos: Tratamiento[];
  }
  