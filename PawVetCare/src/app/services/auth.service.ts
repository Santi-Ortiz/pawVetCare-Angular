import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor(private router: Router) {}

  login(role: string): void {
    this.currentUser = { role }; 
   
    if (role === 'admin') {
      this.router.navigate(['/admin/mascotas']);
    } else if (role === 'vet') {
      this.router.navigate(['/veterinario/mascotas']);
    } else if (role === 'cliente') {
      this.router.navigate(['/cliente/mascotas']);
    }
  }

 
  getUserRole(): string | null {

    return localStorage.getItem('userRole');
  }


  getUserId(): number | null {

    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
