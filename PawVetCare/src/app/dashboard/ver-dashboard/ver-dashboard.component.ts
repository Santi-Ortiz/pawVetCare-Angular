import { Component } from '@angular/core';

// Decorador que define el componente
@Component({
  selector: 'app-ver-dashboard',
  templateUrl: './ver-dashboard.component.html',
  styleUrls: ['./ver-dashboard.component.css']
})

// Clase del componente que define la lógica y datos del mismo
export class VerDashboardComponent {
  userType = 'admin';
}
