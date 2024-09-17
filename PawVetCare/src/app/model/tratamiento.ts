import {Medicamento} from './medicamento'

export interface Tratamiento {
    id: number;
    fecha: Date;
    cedula: number;
    medicamentos: Medicamento[];
  }