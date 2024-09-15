import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderHomeComponent } from './recycle/header-home/header-home.component';
import { HeaderContactoComponent } from './recycle/header-contacto/header-contacto.component';
import { HeaderEquipoComponent } from './recycle/header-equipo/header-equipo.component';
import { FooterComponent } from './recycle/footer/footer.component';
import { HomeComponent } from './landing/home/home.component';
import { EquipoComponent } from './landing/equipo/equipo.component';
import { ContactoComponent } from './landing/contacto/contacto.component';
import { TodasLasMascotasComponent } from './admin/todas-las-mascotas/todas-las-mascotas.component';
import { VerTodasLasMascotasComponent } from './admin/ver-todas-las-mascotas/ver-todas-las-mascotas.component';
import { VerMascotaComponent } from './admin/ver-mascota/ver-mascota.component';
import { HeaderAdminMascotasComponent } from './recycle/header-admin-mascotas/header-admin-mascotas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderHomeComponent,
    HeaderContactoComponent,
    HeaderEquipoComponent,
    FooterComponent,
    HomeComponent,
    EquipoComponent,
    ContactoComponent,
    TodasLasMascotasComponent,
    VerTodasLasMascotasComponent,
    VerMascotaComponent,
    HeaderAdminMascotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
