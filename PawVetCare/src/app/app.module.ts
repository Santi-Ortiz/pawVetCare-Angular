import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderHomeComponent } from './recycle/header-home/header-home.component';
import { FooterComponent } from './recycle/footer/footer.component';
import { HomeComponent } from './landing/home/home.component';
import { EquipoComponent } from './landing/equipo/equipo.component';
import { ContactoComponent } from './landing/contacto/contacto.component';
import { HeaderAdminMascotasComponent } from './recycle/header-admin-mascotas/header-admin-mascotas.component';
import { VerMascotasComponent } from './mascota/ver-mascotas/ver-mascotas.component';
import { PaginacionMascotasComponent } from './mascota/paginacion-mascotas/paginacion-mascotas.component';
import { VerUnaMascotaComponent } from './mascota/ver-una-mascota/ver-una-mascota.component';
import { CarruselMascotasComponent } from './recycle/carrusel-mascotas/carrusel-mascotas.component';
import { FormularioAgregarMascotaComponent } from './recycle/formulario-agregar-mascota/formulario-agregar-mascota.component';
import { InformacionMascotaComponent } from './recycle/informacion-mascota/informacion-mascota.component';
import { MascotaItemComponent } from './recycle/mascota-item/mascota-item.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderHomeComponent,
    FooterComponent,
    HomeComponent,
    EquipoComponent,
    ContactoComponent,
    HeaderAdminMascotasComponent,
    VerMascotasComponent,
    PaginacionMascotasComponent,
    VerUnaMascotaComponent,
    CarruselMascotasComponent,
    FormularioAgregarMascotaComponent,
    InformacionMascotaComponent,
    MascotaItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
