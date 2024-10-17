import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientoMedicamentoService {

  private apiUrl = 'http://localhost:8090/api/tratamiento-medicamento'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Método para obtener los tratamientos por medicamentos
  getTratamientosPorMedicamentos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tratamientos-por-medicamentos`);
  }
}