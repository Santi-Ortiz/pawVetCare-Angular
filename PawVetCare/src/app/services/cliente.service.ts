import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente'; 
import { Mascota } from '../model/mascota'; 
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8090/api/cliente';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  // Obtener información de una mascota específica del cliente
  obtenerMascotaCliente(idMascota: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/mascota/${idMascota}`);
  }

  // Obtener todas las mascotas de un cliente
  obtenerMascotasCliente(): Observable<Mascota[]> {
    const url = 'http://localhost:8090/api/cliente/mascotas';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`, // Obtén el token del AuthService
    });
  
    return this.http.get<Mascota[]>(url, { headers });
  }

  // Obtener todos los clientes
  obtenerTodosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/todos`);
  }

  // Obtener un cliente por su ID
  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/find/${id}`);
  }

  // Obtener un cliente por su cédula
  obtenerClientePorCedula(cedula: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/find/cedula/${cedula}`);
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
