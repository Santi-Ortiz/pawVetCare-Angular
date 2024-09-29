import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUnClienteComponent } from './ver-un-cliente.component';

describe('VerUnClienteComponent', () => {
  let component: VerUnClienteComponent;
  let fixture: ComponentFixture<VerUnClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerUnClienteComponent]
    });
    fixture = TestBed.createComponent(VerUnClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
