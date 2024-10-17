import {Medicamento} from './medicamento'
import { TratamientoMedicamento } from './tratamientoMedicamento';

export interface Tratamiento {
    id: number;
    fecha: Date;
    id_veterinario: number;
    // medicamentos: Medicamento[];

    tratamientoMedicamentos: TratamientoMedicamento[];
  }