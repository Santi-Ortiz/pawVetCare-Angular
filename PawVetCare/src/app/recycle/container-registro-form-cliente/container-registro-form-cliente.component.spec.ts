import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerRegistroFormClienteComponent } from './container-registro-form-cliente.component';

describe('ContainerRegistroFormClienteComponent', () => {
  let component: ContainerRegistroFormClienteComponent;
  let fixture: ComponentFixture<ContainerRegistroFormClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerRegistroFormClienteComponent]
    });
    fixture = TestBed.createComponent(ContainerRegistroFormClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
