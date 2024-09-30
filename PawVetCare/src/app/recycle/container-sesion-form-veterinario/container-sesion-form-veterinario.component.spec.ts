import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSesionFormVeterinarioComponent } from './container-sesion-form-veterinario.component';

describe('ContainerSesionFormVeterinarioComponent', () => {
  let component: ContainerSesionFormVeterinarioComponent;
  let fixture: ComponentFixture<ContainerSesionFormVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerSesionFormVeterinarioComponent]
    });
    fixture = TestBed.createComponent(ContainerSesionFormVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
