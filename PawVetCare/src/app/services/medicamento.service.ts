import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from '../model/medicamento';

@Injectable({
    providedIn: 'root'
})
export class MedicamentoService {

    private apiUrl = 'http://localhost:8090/api/medicamento';

    constructor(private http:HttpClient) { }

    // Obtener todos los medicamentos
    obtenerTodosMedicamentos(): Observable<Medicamento[]> {
        return this.http.get<Medicamento[]>(`${this.apiUrl}/todos`);
    }

    // Obtener medicamento por ID
    obtenerMedicamentoPorId(id: number): Observable<Medicamento>{
        return this.http.get<Medicamento>(`${this.apiUrl}/find/${id}`)
    }

    borrarMedicamento(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
    }


}
