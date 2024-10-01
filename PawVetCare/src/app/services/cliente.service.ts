import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente'; 
import { Mascota } from '../model/mascota'; 

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = '/api/cliente';  

  constructor(private http: HttpClient) { }

  // Obtener información de una mascota específica del cliente
  obtenerMascotaCliente(idMascota: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/mascota/${idMascota}`);
  }

  // Obtener todas las mascotas de un cliente
  obtenerMascotasCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/mascotas/${idCliente}`);
  }

  // Obtener todos los clientes
  obtenerTodosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/todos`);
  }

  // Agregar un nuevo cliente
  agregarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/agregar`, cliente);
  }

  // Actualizar información de un cliente (Admin)
  actualizarClienteAdmin(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/update/admin/${id}`, cliente);
  }

  // Actualizar información de un cliente (Vet)
  actualizarClienteVet(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/update/vet/${id}`, cliente);
  }

  // Eliminar un cliente
  borrarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
