import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionVeterinarioComponent } from './paginacion-veterinario.component';

describe('PaginacionVeterinarioComponent', () => {
  let component: PaginacionVeterinarioComponent;
  let fixture: ComponentFixture<PaginacionVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginacionVeterinarioComponent]
    });
    fixture = TestBed.createComponent(PaginacionVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
