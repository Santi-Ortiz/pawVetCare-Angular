import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEquipoComponent } from './header-equipo.component';

describe('HeaderEquipoComponent', () => {
  let component: HeaderEquipoComponent;
  let fixture: ComponentFixture<HeaderEquipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderEquipoComponent]
    });
    fixture = TestBed.createComponent(HeaderEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
