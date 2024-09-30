import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicializacionComponent } from './inicializacion.component';

describe('InicializacionComponent', () => {
  let component: InicializacionComponent;
  let fixture: ComponentFixture<InicializacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicializacionComponent]
    });
    fixture = TestBed.createComponent(InicializacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
