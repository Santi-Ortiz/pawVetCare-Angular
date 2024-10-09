import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente'; 
import { Mascota } from '../model/mascota'; 

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8090/api/cliente';

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

  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/find/${id}`);
  }

  // Agregar un nuevo cliente
  agregarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/agregar`, cliente);
  }

  // Actualizar información de un cliente (Admin)
  actualizarClienteAdmin(cedula: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/update/admin/${cedula}`, cliente);
  }

  // Actualizar información de un cliente (Vet)
  actualizarClienteVet(cedula: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/update/vet/${cedula}`, cliente);
  }

  // Eliminar un cliente
  borrarCliente(cedula: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${cedula}`);
  }
}
