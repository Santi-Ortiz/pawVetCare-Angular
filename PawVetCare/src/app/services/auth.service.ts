import { HttpClient, HttpParams } from '@angular/common/http';
import { jwtDecode } from "jwt-decode"; // Importa la función como un módulo
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/api/sesion';  // URL del backend
  private currentUser: any = null;
  id: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  //Login
  loginAdmin(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/admin?username=${username}&password=${password}`;
    return this.http.post(url, {}).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('userRole', 'admin');
          localStorage.setItem('authToken', token);
          this.currentUser = response;
        }
      })
    );
  }

  //Login Vet
  loginVet(cedula: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/veterinario?cedula=${cedula}&password=${password}`;
    return this.http.post(url, {}).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('userRole', 'vet');
          localStorage.setItem('authToken', token);
          this.currentUser = response;
        }
      })
    );
  }
  

  loginCliente(id: number): Observable<any> {
    
    const url = `${this.apiUrl}/cliente?id=${id}`;
    return this.http.post(url, {}).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('userRole', 'cliente');
          localStorage.setItem('authToken', token);
          this.currentUser = response;
        }
      })
    );
  }
  
  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  // Método para obtener el rol del usuario
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Método para guardar el userId en el localStorage (opcional)
  setUserId(id: number): void {
    localStorage.setItem('userId', id.toString());
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('userRole');
  }

  // Obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para decodificar el token y obtener el idCliente (username)
  getIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const decoded: any = jwtDecode(token); // Decodifica el token
      return Number(decoded.sub); // Cambia "sub" por el nombre del campo que contiene el ID en tu token
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }
  
  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);  // Redirigir a la página de login
  }
}