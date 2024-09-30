import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasLasSesionesComponent } from './todas-las-sesiones.component';

describe('TodasLasSesionesComponent', () => {
  let component: TodasLasSesionesComponent;
  let fixture: ComponentFixture<TodasLasSesionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodasLasSesionesComponent]
    });
    fixture = TestBed.createComponent(TodasLasSesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
