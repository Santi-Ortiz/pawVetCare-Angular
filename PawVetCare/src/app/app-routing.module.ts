import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { EquipoComponent } from './landing/equipo/equipo.component';
import { ContactoComponent } from './landing/contacto/contacto.component';
import { PaginacionMascotasComponent } from './mascota/paginacion-mascotas/paginacion-mascotas.component';
import { VerUnaMascotaComponent } from './mascota/ver-una-mascota/ver-una-mascota.component';
import { VerMascotasComponent } from './mascota/ver-mascotas/ver-mascotas.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'equipo', component: EquipoComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'mascotas', component: VerMascotasComponent},
  {path: 'mascotas/mascota', component: VerUnaMascotaComponent},
  {path: 'mascotas/todas', component: PaginacionMascotasComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
