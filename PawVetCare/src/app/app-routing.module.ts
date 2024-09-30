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

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'equipo', component: EquipoComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'mascotas', component: VerMascotasComponent},
  {path: 'mascota/:id', component: VerUnaMascotaComponent},
  {path: 'mascotas/todas', component: PaginacionMascotasComponent},
  {path: 'clientes', component: VerClientesComponent},
  {path: 'cliente/:id', component: VerUnClienteComponent},
  {path: 'clientes/todos', component: PaginacionClientesComponent},
  {path: 'veterinarios', component: VerVeterinarioComponent},
  {path: 'veterinario/:id', component: VerUnVeterinarioComponent},
  {path: 'veterinarios/todos', component: PaginacionVeterinarioComponent},
  {path: 'inicializacion', component: InicializacionComponent},
  {path: 'medicamentos/todos', component: PaginacionMedicamentosComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
