import { Mascota } from '../model/mascota';

export interface Cliente {
    id: number;
    cedula: number;
    nombre: string;
    correo: string;
    celular: number;
    mascotas: Mascota[];
  }