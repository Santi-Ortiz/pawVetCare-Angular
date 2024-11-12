export interface TratamientoMedicamento {
    id: number;                // Clave primaria de la tabla intermedia
    tratamiento: number;    // ID del tratamiento
    medicamento: number;     // ID del medicamento
    cantidad:number;
    nombre?: string; 
  }