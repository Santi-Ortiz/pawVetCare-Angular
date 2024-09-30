import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSesionAdminComponent } from './container-sesion-admin.component';

describe('ContainerSesionAdminComponent', () => {
  let component: ContainerSesionAdminComponent;
  let fixture: ComponentFixture<ContainerSesionAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerSesionAdminComponent]
    });
    fixture = TestBed.createComponent(ContainerSesionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
