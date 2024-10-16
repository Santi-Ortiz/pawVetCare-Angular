import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota'; 
import { Tratamiento } from '../model/tratamiento'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MascotasService {
  
  //Springboot
  private apiUrl = 'http://localhost:8090/api/mascota';

 //Springboot con Angular 
 
  constructor(private http: HttpClient) { }

  // Obtener todas las mascotas (Administrador)
  obtenerMascotasAdmin(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/admin/todas`);
  }

  // Obtener todas las mascotas (Veterinarios)
  obtenerMascotasVet(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/vet/todas`);
  }

  // Obtener una mascota por ID
  obtenerMascotaPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/find/${id}`);
  }

  // Obtener una mascota por nombre
  obtenerMascotaPorNombre(nombre: string): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/find/${nombre}`);
  }

  // Agregar nueva mascota (Administrador)
  agregarMascotaAdmin(mascota: Mascota, idCliente: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/admin/agregar?idCliente=${idCliente}`, mascota);
  }

  // Agregar nueva mascota (Veterinario)
  agregarMascotaVet(mascota: Mascota, idCliente: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/vet/agregar?idCliente=${idCliente}`, mascota);
  }

  // Eliminar mascota (Administrador)
  eliminarMascotaAdmin(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/admin/delete/${id}`);
  }

  // Eliminar mascota (Veterinario)
  eliminarMascotaVet(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/vet/delete/${id}`);
  }

  // Actualizar una mascota (Veterinario)
  actualizarMascotaVet(id: number, mascota: Mascota): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/vet/${id}`, mascota);
  }

  // Actualizar una mascota (Administrador)
  actualizarMascotaAdmin(id: number, mascota: Mascota): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/ad/${id}`, mascota);
  }

  // Cuenta el total de mascotas activas en la veterinaria
  contarMascotasActivas(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/activas`);
  }

  // Cuenta el total de mascotas en la veterinaria
  contarTotalMascotas(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/cantidad`)
  }
}
