import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContactoComponent } from './header-contacto.component';

describe('HeaderContactoComponent', () => {
  let component: HeaderContactoComponent;
  let fixture: ComponentFixture<HeaderContactoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderContactoComponent]
    });
    fixture = TestBed.createComponent(HeaderContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
