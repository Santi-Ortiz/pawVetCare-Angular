import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../model/mascota'; 
import { Cliente } from '../model/cliente'; 
import { Veterinario } from '../model/veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private apiUrl = 'http://localhost:8090/api/veterinario';

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

  getAllVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/todos`)
  }

  getVeterinarioByCedula(cedula: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/find/${cedula}`)
  }

  addVeterinario(veterinario: Veterinario, idVet: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/agregar?idVet=${idVet}`, veterinario)
  }

  updateVeterinario(id: number, veterinario: Veterinario): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, veterinario);
  }

  deleteVeterinario(cedula: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${cedula}`);
  }

  contarVeterinarios(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  contarVeterinariosActivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/activos`);
  }

  contarVeterinariosInactivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/inactivos`);
  }
}
