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

  /*constructor() {}

  // Obtener todas las mascotas
  getMascotas(): Mascota[] {
    return this.mascotas;
  }

  // Obtener una mascota por ID
  getMascota(id: number): Mascota | undefined {
    return this.mascotas.find(mascota => mascota.id === id);
  }

  // Agregar una nueva mascota
  agregarMascota(nuevaMascota: Mascota): void {
    const maxId = this.mascotas.length > 0 ? Math.max(...this.mascotas.map(m => m.id)) : 0;
    nuevaMascota.id = maxId + 1; 
    this.mascotas.push(nuevaMascota);
  }

  // Actualizar una mascota existente
  actualizarMascota(id: number, mascotaActualizada: Mascota): void {
    const index = this.mascotas.findIndex(mascota => mascota.id === id);
    if (index !== -1) {
      this.mascotas[index] = { ...this.mascotas[index], ...mascotaActualizada };
    }
  }

  // Eliminar una mascota
  eliminarMascota(id: number): void {
    this.mascotas = this.mascotas.filter(mascota => mascota.id !== id);
  }*/


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
}
