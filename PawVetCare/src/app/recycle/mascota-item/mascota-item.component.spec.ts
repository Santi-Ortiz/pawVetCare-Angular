import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaItemComponent } from './mascota-item.component';

describe('MascotaItemComponent', () => {
  let component: MascotaItemComponent;
  let fixture: ComponentFixture<MascotaItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotaItemComponent]
    });
    fixture = TestBed.createComponent(MascotaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
