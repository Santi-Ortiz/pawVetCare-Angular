import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionClientesComponent } from './paginacion-clientes.component';

describe('PaginacionClientesComponent', () => {
  let component: PaginacionClientesComponent;
  let fixture: ComponentFixture<PaginacionClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginacionClientesComponent]
    });
    fixture = TestBed.createComponent(PaginacionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
