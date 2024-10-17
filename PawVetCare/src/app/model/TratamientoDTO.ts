export interface TratamientoDTO {
    id: number;
    fecha: Date;
    veterinarioId: number;
    mascotaId: number;
    medicamentos: MedicamentoDTO[];
  }
  
export interface MedicamentoDTO {
    id: number;
    nombre: string;
    cantidad: number;
}
  