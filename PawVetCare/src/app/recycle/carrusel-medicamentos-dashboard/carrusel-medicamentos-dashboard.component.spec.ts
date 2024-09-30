import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselMedicamentosDashboardComponent } from './carrusel-medicamentos-dashboard.component';

describe('CarruselMedicamentosDashboardComponent', () => {
  let component: CarruselMedicamentosDashboardComponent;
  let fixture: ComponentFixture<CarruselMedicamentosDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselMedicamentosDashboardComponent]
    });
    fixture = TestBed.createComponent(CarruselMedicamentosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
