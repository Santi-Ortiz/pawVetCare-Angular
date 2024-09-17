import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselMascotasComponent } from './carrusel-mascotas.component';

describe('CarruselMascotasComponent', () => {
  let component: CarruselMascotasComponent;
  let fixture: ComponentFixture<CarruselMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselMascotasComponent]
    });
    fixture = TestBed.createComponent(CarruselMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
