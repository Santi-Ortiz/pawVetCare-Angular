import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTop3TratamientosComponent } from './container-top-3-tratamientos.component';

describe('ContainerTop3TratamientosComponent', () => {
  let component: ContainerTop3TratamientosComponent;
  let fixture: ComponentFixture<ContainerTop3TratamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerTop3TratamientosComponent]
    });
    fixture = TestBed.createComponent(ContainerTop3TratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
