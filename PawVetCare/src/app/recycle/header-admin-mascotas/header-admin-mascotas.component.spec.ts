import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdminMascotasComponent } from './header-admin-mascotas.component';

describe('HeaderAdminMascotasComponent', () => {
  let component: HeaderAdminMascotasComponent;
  let fixture: ComponentFixture<HeaderAdminMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderAdminMascotasComponent]
    });
    fixture = TestBed.createComponent(HeaderAdminMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
