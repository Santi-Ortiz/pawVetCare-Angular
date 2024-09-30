import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTotalTratamientosComponent } from './container-total-tratamientos.component';

describe('ContainerTotalTratamientosComponent', () => {
  let component: ContainerTotalTratamientosComponent;
  let fixture: ComponentFixture<ContainerTotalTratamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerTotalTratamientosComponent]
    });
    fixture = TestBed.createComponent(ContainerTotalTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
