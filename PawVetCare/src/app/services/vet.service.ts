import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../model/mascota';
import { Cliente } from '../model/cliente';
import { Veterinario } from '../model/veterinario';

@Injectable({
  providedIn: 'root',
})
export class VeterinarioService {
  private apiUrl = 'http://localhost:8090/api/veterinario';

  constructor(private http: HttpClient) {}

  // Obtener todas las mascotas
  getAllMascotas(id: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotasCID/${id}`);
  }

  // Obtener la información de una mascota por ID
  getMascotaById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/mascotas/${id}`);
  }

  // Obtener la URL de redirección para una mascota
  getRedirectUrlForMascota(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/busqueda/mascota`, {
      params: { id: id.toString() },
    });
  }

  // Obtener todas las mascotas compartidas
  getAllMascotasShared(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas/todas`);
  }

  // Obtener todos los clientes
  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  // Obtener todos los clientes compartidos
  getAllClientesShared(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes/todos`);
  }

  // Obtener la información de un cliente por su cédula
  getClienteByCedula(cedula: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/${cedula}`);
  }

  // Obtener todos los veterinarios
  getAllVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/todos`);
  }

  // Obtener un veterinario por cédula
  getVeterinarioByCedula(cedula: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/find/${cedula}`);
  }

  // Obtener un veterinario por ID
  getVeterinarioById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/findID/${id}`);
  }

  // Agregar un veterinario
  addVeterinario(veterinario: Veterinario, idVet: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/agregar?idVet=${idVet}`,
      veterinario
    );
  }

  // Actualizar un veterinario por cédula
  updateVeterinario(cedula: number, veterinario: Veterinario): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${cedula}`, veterinario);
  }

  // Eliminar un veterinario por cédula
  deleteVeterinario(cedula: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${cedula}`);
  }

  // Contar el total de veterinarios
  contarVeterinarios(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  // Contar veterinarios activos
  contarVeterinariosActivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/activos`);
  }

  // Contar veterinarios inactivos
  contarVeterinariosInactivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/inactivos`);
  }
}
