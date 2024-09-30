import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSesionVeterinarioComponent } from './container-sesion-veterinario.component';

describe('ContainerSesionVeterinarioComponent', () => {
  let component: ContainerSesionVeterinarioComponent;
  let fixture: ComponentFixture<ContainerSesionVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerSesionVeterinarioComponent]
    });
    fixture = TestBed.createComponent(ContainerSesionVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
