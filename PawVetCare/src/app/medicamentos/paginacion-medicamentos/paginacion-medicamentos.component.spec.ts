import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionMedicamentosComponent } from './paginacion-medicamentos.component';

describe('PaginacionMedicamentosComponent', () => {
  let component: PaginacionMedicamentosComponent;
  let fixture: ComponentFixture<PaginacionMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginacionMedicamentosComponent]
    });
    fixture = TestBed.createComponent(PaginacionMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
