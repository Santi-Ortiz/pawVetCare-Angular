import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../model/tratamiento';

@Injectable({
    providedIn: 'root'
})
export class TratamientoService {

    private apiUrl = 'http://localhost:8090/api/tratamiento';

    constructor(private http:HttpClient) { }

    obtenerTotalTratamientosUltimoMes(): Observable<number>{
        return this.http.get<number>(`${this.apiUrl}/tratamientos-ultimo-mes`);
    }

    obtenerTop3Tratamientos(): Observable<Tratamiento[]>{
        return this.http.get<Tratamiento[]>(`${this.apiUrl}/top3`);	
    }
}
