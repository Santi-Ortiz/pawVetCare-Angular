import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from '../model/medicamento';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private apiUrl = 'http://localhost:8090/api/medicamento';

  constructor(private http: HttpClient) {}

  // Obtener todos los medicamentos
  obtenerTodosMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.apiUrl}/todos`);
  }

  // Obtener medicamento por ID
  obtenerMedicamentoPorId(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.apiUrl}/find/${id}`);
  }

  // Crear un nuevo medicamento
  agregarMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(`${this.apiUrl}/agregar`, medicamento);
  }

  // Actualizar un medicamento por ID
  actualizarMedicamento(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.apiUrl}/update/${id}`, medicamento);
  }

  // Borrar un medicamento
  borrarMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Obtener ventas totales de la veterinaria
  obtenerVentasTotales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ventas-totales`);
  }

  // Obtener ganancias totales/netas de la veterinaria
  obtenerGananciasTotales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ganancias-totales`);
  }

  // Obtener costos totales de la veterinaria
  obtenerCostosTotales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/costos-totales`);
  }
}
