import { Mascota } from './mascota';
import {Medicamento} from './medicamento'
import { TratamientoMedicamento } from './tratamientoMedicamento';
import { Veterinario } from './veterinario';

export interface Tratamiento {
  id: number;
  fecha: Date;
  veterinario: Veterinario;
  mascota: Mascota;
  tratamientoMedicamentos: TratamientoMedicamento[];
}