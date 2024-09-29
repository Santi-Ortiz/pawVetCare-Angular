import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselVeterinariosComponent } from './carrusel-veterinarios.component';

describe('CarruselVeterinariosComponent', () => {
  let component: CarruselVeterinariosComponent;
  let fixture: ComponentFixture<CarruselVeterinariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselVeterinariosComponent]
    });
    fixture = TestBed.createComponent(CarruselVeterinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
