import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarClienteComponent } from './iniciar-cliente.component';

describe('IniciarClienteComponent', () => {
  let component: IniciarClienteComponent;
  let fixture: ComponentFixture<IniciarClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciarClienteComponent]
    });
    fixture = TestBed.createComponent(IniciarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
