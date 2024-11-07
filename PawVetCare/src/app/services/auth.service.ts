import { HttpClient, HttpParams } from '@angular/common/http';
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

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);  // Redirigir a la página de login
  }
}