export interface TratamientoMedicamento {
    id: number;                // Clave primaria de la tabla intermedia
    tratamientoId: number;    // ID del tratamiento
    medicamentoId: number;     // ID del medicamento
    cantidad:number;
  }