import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../model/mascota'; 
import { Cliente } from '../model/cliente'; 

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private apiUrl = '/api/veterinario'; 

  constructor(private http: HttpClient) { }

  // Obtener todas las mascotas (Veterinario)
  getAllMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas`);
  }

  // Obtener la información de una mascota por ID (Veterinario)
  getMascotaById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/mascotas/${id}`);
  }

  // Obtener la URL de redirección para una mascota (Veterinario)
  getRedirectUrlForMascota(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/busqueda/mascota`, { params: { id: id.toString() } });
  }

  // Obtener todas las mascotas compartidas (Veterinario, admin compartido)
  getAllMascotasShared(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas/todas`);
  }

  // Obtener todos los clientes (Veterinario)
  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  // Obtener todos los clientes compartidos (Veterinario, admin compartido)
  getAllClientesShared(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes/todos`);
  }

  // Obtener la información de un cliente por su cédula (Veterinario)
  getClienteByCedula(cedula: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/${cedula}`);
  }
}
