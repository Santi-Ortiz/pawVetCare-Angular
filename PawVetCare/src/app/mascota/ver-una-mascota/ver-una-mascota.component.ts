import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../model/mascota';
import { AuthService } from 'src/app/services/auth.service';
import { Tratamiento } from 'src/app/model/tratamiento';

@Component({
  selector: 'app-ver-una-mascota',
  templateUrl: './ver-una-mascota.component.html',
  styleUrls: ['./ver-una-mascota.component.css'],
})
export class VerUnaMascotaComponent implements OnInit {
  userType: string | null | undefined;
  tratamientos: Tratamiento[] = [];
  mascotaForm: FormGroup;
  isEditMode: boolean = false;
  mascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: '',
    estado: true,
    cedulaCliente: 0,
    tratamientos: [],
  };

  constructor(
    private mascotaService: MascotasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.mascotaForm = this.fb.group({
      nombre: [''],
      raza: [''],
      edad: [''],
      peso: [''],
      enfermedad: [''],
      cliente: [''],
      estado: [''],
      foto: [''],
    });

    this.mascotaForm.get('estado')?.valueChanges.subscribe((nuevoEstado: boolean) => {
      this.mascota.estado = nuevoEstado;
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('ID de mascota inválido.');
      return;
    }

    this.userType = this.authService.getUserRole();

    // Cargar tratamientos
    this.mascotaService.obtenerTratamientosPorMascotaId(id).subscribe(
      (tratamientos: Tratamiento[]) => {
        this.tratamientos = tratamientos || [];
        console.log('Tratamientos cargados:', this.tratamientos);
      },
      (error) => {
        console.error('Error al cargar tratamientos:', error);
        this.tratamientos = [];
      }
    );

    // Cargar información de la mascota
    this.mascotaService.obtenerMascotaPorId(id).subscribe(
      (mascota: Mascota) => {
        this.mascota = mascota;
        console.log('Mascota cargada:', this.mascota);
        this.mascotaForm.patchValue({
          nombre: this.mascota.nombre,
          raza: this.mascota.raza,
          edad: this.mascota.edad,
          peso: this.mascota.peso,
          enfermedad: this.mascota.enfermedad,
          cliente: this.mascota.cedulaCliente,
          estado: this.mascota.estado,
          foto: this.mascota.foto,
        });
        this.mascotaForm.disable();
      },
      (error) => {
        console.error(`Error al obtener la mascota con ID ${id}:`, error);
        alert(`Mascota con ID ${id} no encontrada`);
      }
    );
  }
}
