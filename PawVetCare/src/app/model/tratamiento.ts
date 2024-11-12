import { Mascota } from './mascota';
import {Medicamento} from './medicamento'
import { TratamientoMedicamento } from './tratamientoMedicamento';
import { Veterinario } from './veterinario';

export interface Tratamiento {
  medicamentoPosicionCero: TratamientoMedicamento;
  id: number;
  fecha: Date;
  veterinarioId: number;
  veterinarioNombre?: string; // Campo opcional para el nombre del veterinario
  mascotaId: number;
  medicamentos: TratamientoMedicamento[]; // Relación intermedia con medicamentos
}

