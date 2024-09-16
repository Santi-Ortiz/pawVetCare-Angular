import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderHomeComponent } from './recycle/header-home/header-home.component';
import { HeaderContactoComponent } from './recycle/header-contacto/header-contacto.component';
import { HeaderEquipoComponent } from './recycle/header-equipo/header-equipo.component';
import { FooterComponent } from './recycle/footer/footer.component';
import { HomeComponent } from './landing/home/home.component';
import { EquipoComponent } from './landing/equipo/equipo.component';
import { ContactoComponent } from './landing/contacto/contacto.component';
import { HeaderAdminMascotasComponent } from './recycle/header-admin-mascotas/header-admin-mascotas.component';
import { VerMascotasComponent } from './mascota/ver-mascotas/ver-mascotas.component';
import { PaginacionMascotasComponent } from './mascota/paginacion-mascotas/paginacion-mascotas.component';
import { VerUnaMascotaComponent } from './mascota/ver-una-mascota/ver-una-mascota.component';
import { HeaderVetMascotasComponent } from './recycle/header-vet-mascotas/header-vet-mascotas.component';
import { HeaderClienteComponent } from './recycle/header-cliente/header-cliente.component';

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
    HeaderAdminMascotasComponent,
    VerMascotasComponent,
    PaginacionMascotasComponent,
    VerUnaMascotaComponent,
    HeaderVetMascotasComponent,
    HeaderClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
