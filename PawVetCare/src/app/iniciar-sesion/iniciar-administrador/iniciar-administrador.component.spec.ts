import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarAdministradorComponent } from './iniciar-administrador.component';

describe('IniciarAdministradorComponent', () => {
  let component: IniciarAdministradorComponent;
  let fixture: ComponentFixture<IniciarAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciarAdministradorComponent]
    });
    fixture = TestBed.createComponent(IniciarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
