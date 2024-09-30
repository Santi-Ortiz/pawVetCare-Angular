import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselTopMedicamentosComponent } from './carrusel-top-medicamentos.component';

describe('CarruselTopMedicamentosComponent', () => {
  let component: CarruselTopMedicamentosComponent;
  let fixture: ComponentFixture<CarruselTopMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselTopMedicamentosComponent]
    });
    fixture = TestBed.createComponent(CarruselTopMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
