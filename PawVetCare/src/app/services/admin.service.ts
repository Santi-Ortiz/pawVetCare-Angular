import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../model/mascota'; 
import { Cliente } from '../model/cliente'; 

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = '/api/admin';  

  constructor(private http: HttpClient) { }

  // Obtener todas las mascotas (Administradores)
  obtenerTodasMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas`);
  }

  // Obtener todas las mascotas - otra ruta
  obtenerMascotasTodas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas/todas`);
  }

  // Obtener mascota por ID
  obtenerMascotaPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/mascotas/${id}`);
  }

  // Obtener todos los clientes
  obtenerTodosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  // Obtener todos los clientes - otra ruta
  obtenerClientesTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes/todos`);
  }

  // Obtener cliente por cédula
  obtenerClientePorCedula(cedula: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/${cedula}`);
  }

  // Obtener todos los veterinarios
  obtenerTodosVeterinarios(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/veterinarios`);
  }

  // Obtener todos los veterinarios - otra ruta
  obtenerVeterinariosTodos(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/veterinarios/todos`);
  }

  // Obtener veterinario por ID
  obtenerVeterinarioPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/veterinarios/${id}`);
  }

  // Obtener datos del dashboard
  obtenerDashboard(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/dashboard`);
  }

  // Obtener datos de inicialización
  obtenerInicializacion(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/inicializacion`);
  }
}
