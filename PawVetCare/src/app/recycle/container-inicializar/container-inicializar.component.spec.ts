import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInicializarComponent } from './container-inicializar.component';

describe('ContainerInicializarComponent', () => {
  let component: ContainerInicializarComponent;
  let fixture: ComponentFixture<ContainerInicializarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerInicializarComponent]
    });
    fixture = TestBed.createComponent(ContainerInicializarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
