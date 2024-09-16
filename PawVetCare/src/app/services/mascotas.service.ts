import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota'; 

@Injectable({
  providedIn: 'root'
})

export class MascotasService {
  // Base de datos
  private mascotas: Mascota[] = [
    {
      id: 0,
      nombre: 'Firulais',
      raza: 'Labrador',
      edad: 4,
      peso: 20,
      enfermedad: 'Sobrepeso',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Firulais_2.0.jpg/330px-Firulais_2.0.jpg',
      estado: true,
      cliente: 1
    },
    {
      id: 1,
      nombre: 'Mittens',
      raza: 'Terrier de Norwich',
      edad: 2,
      peso: 5,
      enfermedad: 'Alergia',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Norwichterrier.jpg',
      estado: true,
      cliente: 2
    },
    {
      id: 2,
      nombre: 'Alejandra',
      raza: 'Rottweiler',
      edad: 1,
      peso: 3,
      enfermedad: 'Chandosa',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/02_I_Exposici%C3%B3n_Monogr%C3%A1fica_Club_Rottweiler_de_Espa%C3%B1a_-_Santa_Brigida_-_Gran_Canaria.jpg/450px-02_I_Exposici%C3%B3n_Monogr%C3%A1fica_Club_Rottweiler_de_Espa%C3%B1a_-_Santa_Brigida_-_Gran_Canaria.jpg',
      estado: true,
      cliente:3
    },
    {
      id: 3,
      nombre: 'Santiago',
      raza: 'Golden Retriever',
      edad: 1,
      peso: 4,
      enfermedad: 'Pulgoso',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Golden_Retriever_9-year_old.jpg/480px-Golden_Retriever_9-year_old.jpg',
      estado: true,
      cliente:4
    },
    {
      id: 4,
      nombre: 'Nicolas',
      raza: 'San bernardo',
      edad: 3,
      peso: 4,
      enfermedad: 'Rabia',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Rey_nieve.jpg/480px-Rey_nieve.jpg',
      estado: true,
      cliente:5
    }
  ];

  constructor() {}

  // Obtener todas las mascotas
  getMascotas(): Mascota[] {
    return this.mascotas;
  }

  // Obtener una mascota por ID
  getMascota(id: number): Mascota | undefined {
    return this.mascotas.find(mascota => mascota.id === id);
  }

  // Agregar una nueva mascota
  agregarMascota(nuevaMascota: Mascota): void {
    const maxId = this.mascotas.length > 0 ? Math.max(...this.mascotas.map(m => m.id)) : 0;
    nuevaMascota.id = maxId + 1; 
    this.mascotas.push(nuevaMascota);
  }

  // Actualizar una mascota existente
  actualizarMascota(id: number, mascotaActualizada: Mascota): void {
    const index = this.mascotas.findIndex(mascota => mascota.id === id);
    if (index !== -1) {
      this.mascotas[index] = { ...this.mascotas[index], ...mascotaActualizada };
    }
  }

  // Eliminar una mascota
  eliminarMascota(id: number): void {
    this.mascotas = this.mascotas.filter(mascota => mascota.id !== id);
  }
}
