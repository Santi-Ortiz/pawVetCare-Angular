import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { InicializacionComponent } from './administrador/inicializacion/inicializacion.component';
import { ContainerInicializarComponent } from './recycle/container-inicializar/container-inicializar.component';
import { CarruselMedicamentosComponent } from './recycle/carrusel-medicamentos/carrusel-medicamentos.component';
import { PaginacionMedicamentosComponent } from './medicamentos/paginacion-medicamentos/paginacion-medicamentos.component';
import { MedicamentoItemComponent } from './recycle/medicamento-item/medicamento-item.component';
import { TodasLasSesionesComponent } from './iniciar-sesion/todas-las-sesiones/todas-las-sesiones.component';
import { ContainerSesionClienteComponent } from './recycle/container-sesion-cliente/container-sesion-cliente.component';
import { ContainerSesionVeterinarioComponent } from './recycle/container-sesion-veterinario/container-sesion-veterinario.component';
import { ContainerSesionAdminComponent } from './recycle/container-sesion-admin/container-sesion-admin.component';
import { IniciarClienteComponent } from './iniciar-sesion/iniciar-cliente/iniciar-cliente.component';
import { ContainerSesionFormClienteComponent } from './recycle/container-sesion-form-cliente/container-sesion-form-cliente.component';
import { ContainerRegistroFormClienteComponent } from './recycle/container-registro-form-cliente/container-registro-form-cliente.component';
import { RegistroClienteComponent } from './registro/registro-cliente/registro-cliente.component';
import { IniciarVeterinarioComponent } from './iniciar-sesion/iniciar-veterinario/iniciar-veterinario.component';
import { ContainerSesionFormVeterinarioComponent } from './recycle/container-sesion-form-veterinario/container-sesion-form-veterinario.component';
import { ContainerSesionFormAdministradorComponent } from './recycle/container-sesion-form-administrador/container-sesion-form-administrador.component';
import { IniciarAdministradorComponent } from './iniciar-sesion/iniciar-administrador/iniciar-administrador.component';
import { VerDashboardComponent } from './dashboard/ver-dashboard/ver-dashboard.component';
import { ContainerTotalTratamientosComponent } from './recycle/container-total-tratamientos/container-total-tratamientos.component';
import { ContainerTotalTratamientosPorTipoComponent } from './recycle/container-total-tratamientos-por-tipo/container-total-tratamientos-por-tipo.component';
import { CarruselMedicamentosDashboardComponent } from './recycle/carrusel-medicamentos-dashboard/carrusel-medicamentos-dashboard.component';
import { ContainerCantidadVeterinariosActivosComponent } from './recycle/container-cantidad-veterinarios-activos/container-cantidad-veterinarios-activos.component';
import { ContainerCantidadVeterinariosInactivosComponent } from './recycle/container-cantidad-veterinarios-inactivos/container-cantidad-veterinarios-inactivos.component';
import { ContainerCantidadMascotasTotalesComponent } from './recycle/container-cantidad-mascotas-totales/container-cantidad-mascotas-totales.component';
import { ContainerCantidadMascotasActivasComponent } from './recycle/container-cantidad-mascotas-activas/container-cantidad-mascotas-activas.component';
import { ContainerVentasTotalesComponent } from './recycle/container-ventas-totales/container-ventas-totales.component';
import { ContainerGananciasTotalesComponent } from './recycle/container-ganancias-totales/container-ganancias-totales.component';
import { ContainerTop3TratamientosComponent } from './recycle/container-top-3-tratamientos/container-top-3-tratamientos.component';
import { CarruselTopMedicamentosComponent } from './recycle/carrusel-top-medicamentos/carrusel-top-medicamentos.component';
import { FormularioDarTratamientoComponent } from './recycle/formulario-dar-tratamiento/formulario-dar-tratamiento.component';
import { CarruselHistorialComponent } from './recycle/carrusel-historial/carrusel-historial.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { OtrosComponent } from './cliente/otros/otros.component';
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
    InformacionVeterinarioComponent,
    InicializacionComponent,
    ContainerInicializarComponent,
    CarruselMedicamentosComponent,
    PaginacionMedicamentosComponent,
    MedicamentoItemComponent,
    TodasLasSesionesComponent,
    ContainerSesionClienteComponent,
    ContainerSesionVeterinarioComponent,
    ContainerSesionAdminComponent,
    IniciarClienteComponent,
    ContainerSesionFormClienteComponent,
    ContainerRegistroFormClienteComponent,
    RegistroClienteComponent,
    IniciarVeterinarioComponent,
    ContainerSesionFormVeterinarioComponent,
    ContainerSesionFormAdministradorComponent,
    IniciarAdministradorComponent,
    VerDashboardComponent,
    ContainerTotalTratamientosComponent,
    ContainerTotalTratamientosPorTipoComponent,
    CarruselMedicamentosDashboardComponent,
    ContainerCantidadVeterinariosActivosComponent,
    ContainerCantidadVeterinariosInactivosComponent,
    ContainerCantidadMascotasTotalesComponent,
    ContainerCantidadMascotasActivasComponent,
    ContainerVentasTotalesComponent,
    ContainerGananciasTotalesComponent,
    ContainerTop3TratamientosComponent,
    CarruselTopMedicamentosComponent,
    FormularioDarTratamientoComponent,
    CarruselHistorialComponent,
    ChatBotComponent,
    OtrosComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
