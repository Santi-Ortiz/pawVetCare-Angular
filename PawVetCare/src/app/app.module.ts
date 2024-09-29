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
import { PaginacionClientesComponent } from './cliente/paginacion-clientes/paginacion-clientes.component';
import { VerClientesComponent } from './cliente/ver-clientes/ver-clientes.component';
import { VerUnClienteComponent } from './cliente/ver-un-cliente/ver-un-cliente.component';
import { CarruselClientesComponent } from './recycle/carrusel-clientes/carrusel-clientes.component';
import { FormularioAgregarClienteComponent } from './recycle/formulario-agregar-cliente/formulario-agregar-cliente.component';
import { ClienteItemComponent } from './recycle/cliente-item/cliente-item.component';
import { InformacionClienteComponent } from './recycle/informacion-cliente/informacion-cliente.component';
import { PaginacionVeterinarioComponent } from './veterinario/paginacion-veterinario/paginacion-veterinario.component';
import { VerVeterinarioComponent } from './veterinario/ver-veterinario/ver-veterinario.component';
import { VerUnVeterinarioComponent } from './veterinario/ver-un-veterinario/ver-un-veterinario.component';
import { CarruselVeterinariosComponent } from './recycle/carrusel-veterinarios/carrusel-veterinarios.component';
import { FormularioAgregarVeterinarioComponent } from './recycle/formulario-agregar-veterinario/formulario-agregar-veterinario.component';
import { VeterinarioItemComponent } from './recycle/veterinario-item/veterinario-item.component';
import { InformacionVeterinarioComponent } from './recycle/informacion-veterinario/informacion-veterinario.component';
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
    MascotaItemComponent,
    PaginacionClientesComponent,
    VerClientesComponent,
    VerUnClienteComponent,
    CarruselClientesComponent,
    FormularioAgregarClienteComponent,
    ClienteItemComponent,
    InformacionClienteComponent,
    PaginacionVeterinarioComponent,
    VerVeterinarioComponent,
    VerUnVeterinarioComponent,
    CarruselVeterinariosComponent,
    FormularioAgregarVeterinarioComponent,
    VeterinarioItemComponent,
    InformacionVeterinarioComponent
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
