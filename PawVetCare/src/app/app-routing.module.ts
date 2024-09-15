import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { EquipoComponent } from './landing/equipo/equipo.component';
import { ContactoComponent } from './landing/contacto/contacto.component';
import { TodasLasMascotasComponent } from './admin/todas-las-mascotas/todas-las-mascotas.component';
import { VerMascotaComponent } from './admin/ver-mascota/ver-mascota.component';
import { VerTodasLasMascotasComponent } from './admin/ver-todas-las-mascotas/ver-todas-las-mascotas.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'equipo', component: EquipoComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'admin/mascotas', component: TodasLasMascotasComponent},
  {path: 'admin/mascotas/mascota', component: VerMascotaComponent},
  {path: 'admin/mascotas/todas', component: VerTodasLasMascotasComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
