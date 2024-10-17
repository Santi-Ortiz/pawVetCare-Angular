import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TratamientoService {

    private apiUrl = 'http://localhost:8090/api/tratamiento';

    constructor(private http:HttpClient) { }

    obtenerTotalTratamientosUltimoMes(): Observable<number>{
        return this.http.get<number>(`${this.apiUrl}/tratamientos-ultimo-mes`);
    }

}
