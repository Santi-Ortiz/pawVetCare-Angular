
import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private mascotas: Mascota[] = [];
  private isSearchActive: boolean = false;

  setMascotas(data: Mascota[], searchActive: boolean): void {
    this.mascotas = data;
    this.isSearchActive = searchActive;
  }

  getMascotas(): Mascota[] {
    return this.mascotas;
  }

  isSearch(): boolean {
    return this.isSearchActive;
  }
}
