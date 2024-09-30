import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCantidadMascotasActivasComponent } from './container-cantidad-mascotas-activas.component';

describe('ContainerCantidadMascotasActivasComponent', () => {
  let component: ContainerCantidadMascotasActivasComponent;
  let fixture: ComponentFixture<ContainerCantidadMascotasActivasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerCantidadMascotasActivasComponent]
    });
    fixture = TestBed.createComponent(ContainerCantidadMascotasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
