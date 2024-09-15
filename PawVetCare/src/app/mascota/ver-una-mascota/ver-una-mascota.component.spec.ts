import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUnaMascotaComponent } from './ver-una-mascota.component';

describe('VerUnaMascotaComponent', () => {
  let component: VerUnaMascotaComponent;
  let fixture: ComponentFixture<VerUnaMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerUnaMascotaComponent]
    });
    fixture = TestBed.createComponent(VerUnaMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
