import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { EquipoComponent } from './landing/equipo/equipo.component';
import { ContactoComponent } from './landing/contacto/contacto.component';
import { PaginacionMascotasComponent } from './mascota/paginacion-mascotas/paginacion-mascotas.component';
import { VerUnaMascotaComponent } from './mascota/ver-una-mascota/ver-una-mascota.component';
import { VerMascotasComponent } from './mascota/ver-mascotas/ver-mascotas.component';
import { VerClientesComponent } from './cliente/ver-clientes/ver-clientes.component';
import { VerUnClienteComponent } from './cliente/ver-un-cliente/ver-un-cliente.component';
import { PaginacionClientesComponent } from './cliente/paginacion-clientes/paginacion-clientes.component';
import { VerVeterinarioComponent } from './veterinario/ver-veterinario/ver-veterinario.component';
import { VerUnVeterinarioComponent } from './veterinario/ver-un-veterinario/ver-un-veterinario.component';
import { PaginacionVeterinarioComponent } from './veterinario/paginacion-veterinario/paginacion-veterinario.component';
import { InicializacionComponent } from './administrador/inicializacion/inicializacion.component';
import { PaginacionMedicamentosComponent } from './medicamentos/paginacion-medicamentos/paginacion-medicamentos.component';
import { TodasLasSesionesComponent } from './iniciar-sesion/todas-las-sesiones/todas-las-sesiones.component';
import { IniciarClienteComponent } from './iniciar-sesion/iniciar-cliente/iniciar-cliente.component';
import { RegistroClienteComponent } from './registro/registro-cliente/registro-cliente.component';
import { IniciarVeterinarioComponent } from './iniciar-sesion/iniciar-veterinario/iniciar-veterinario.component';
import { IniciarAdministradorComponent } from './iniciar-sesion/iniciar-administrador/iniciar-administrador.component';
import { VerDashboardComponent } from './dashboard/ver-dashboard/ver-dashboard.component';
import { AuthGuard } from './guard/authguard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'equipo', component: EquipoComponent},
  {path: 'contacto', component: ContactoComponent},
  //VerMascotasComponent
  {path: 'mascotas', component: VerMascotasComponent},
  {
    path: 'admin/mascotas',
    component: VerMascotasComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' } 
  },
  {
    path: 'veterinario/mascotas',
    component: VerMascotasComponent,
    canActivate: [AuthGuard],
    data: { role: 'vet' }
  },
  {
    path: 'cliente/mascotas',
    component: VerMascotasComponent,
    canActivate: [AuthGuard],
    data: { role: 'cliente' }
  },
  {path: 'mascota/:id', component: VerUnaMascotaComponent},
  {path: 'mascotas/todas', component: PaginacionMascotasComponent},
  {path: 'clientes', component: VerClientesComponent},
  {path: 'cliente/:id', component: VerUnClienteComponent},
  {path: 'clientes/todos', component: PaginacionClientesComponent},
  {path: 'veterinarios', component: VerVeterinarioComponent},
  {path: 'veterinario/:id', component: VerUnVeterinarioComponent},
  {path: 'veterinarios/todos', component: PaginacionVeterinarioComponent},
  {path: 'inicializacion', component: InicializacionComponent},
  {path: 'dashboard', component: VerDashboardComponent},
  {path: 'medicamentos/todos', component: PaginacionMedicamentosComponent},
  {path: 'iniciarSesion/sesiones', component: TodasLasSesionesComponent},
  {path: 'iniciarSesion/cliente', component: IniciarClienteComponent},
  {path: 'iniciarSesion/veterinario', component: IniciarVeterinarioComponent},
  {path: 'iniciarSesion/administrador', component: IniciarAdministradorComponent},
  {path: 'registro', component: RegistroClienteComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
