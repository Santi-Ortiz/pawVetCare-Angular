import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionMascotasComponent } from './paginacion-mascotas.component';

describe('PaginacionMascotasComponent', () => {
  let component: PaginacionMascotasComponent;
  let fixture: ComponentFixture<PaginacionMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginacionMascotasComponent]
    });
    fixture = TestBed.createComponent(PaginacionMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
