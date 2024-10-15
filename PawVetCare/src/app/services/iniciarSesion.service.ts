import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente'; 
import { Admin } from '../model/admin'; 
import { Veterinario } from '../model/veterinario'; 

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private apiUrl = '/api/sesion';  // Ruta base del backend

  constructor(private http: HttpClient) { }

  // Iniciar sesión de cliente
  loginCliente(id: number): Observable<Cliente> {
    const url = `${this.apiUrl}/cliente`;
    const params = { id: id.toString() };
    return this.http.post<Cliente>(url, null, { params });
  }

  // Verificar sesión activa de cliente
  inicioCliente(): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/inicio`);
  }

  // Iniciar sesión de veterinario
  loginVeterinario(cedula: number, password: string): Observable<Veterinario> {
    const url = `${this.apiUrl}/veterinario`;
    const params = { cedula: cedula.toString(), password };
    return this.http.post<Veterinario>(url, null, { params });
  }

  // Iniciar sesión de administrador
  loginAdmin(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
  
    return this.http.post(`${this.apiUrl}/admin`, {}, { params });
  }  
}
