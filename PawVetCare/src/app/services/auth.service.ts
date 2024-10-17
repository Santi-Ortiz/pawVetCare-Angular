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
        // Guardamos el rol y el ID del usuario en localStorage o en una variable compartida
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userId', response.id);
        this.currentUser = response;
      })
    );
  }

  //Login Vet
  loginVet(cedula: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/veterinario?cedula=${cedula}&password=${password}`;
    return this.http.post(url, {}).pipe(
      tap((response: any) => {
        // Guardamos el rol y el ID del usuario en localStorage o en una variable compartida
        localStorage.setItem('userRole', 'vet');
        localStorage.setItem('userId', response.cedula);
        this.currentUser = response;
      })
    );
  }

  //Login Cliente
  //  loginCliente(id: string): Observable<any> {
  //   const params = new HttpParams().set('id', id);
  //   return this.http.post(`${this.apiUrl}/cliente`, null, { params });
  // }
  loginCliente(id: number): Observable<any> {
    
    const url = `${this.apiUrl}/cliente?id=${id}`;
    return this.http.post(url, {}).pipe(
      tap((response: any) => {
        // Guardamos el rol y el ID del usuario en localStorage o en una variable compartida
        localStorage.setItem('userRole', 'cliente');
        localStorage.setItem('userId', response.cedula);
        this.currentUser = response;
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

  // Método para obtener el ID del usuario
  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
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
    this.router.navigate(['/login']);  // Redirigir a la página de login
  }
}