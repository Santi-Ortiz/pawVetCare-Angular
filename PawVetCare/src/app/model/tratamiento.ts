import {Medicamento} from './medicamento'
import { TratamientoMedicamento } from './tratamientoMedicamento';

export interface Tratamiento {
    id: number;
    fecha: Date;
    cedula: number;
    // medicamentos: Medicamento[];
    tratamientoMedicamentos: TratamientoMedicamento[];
  }