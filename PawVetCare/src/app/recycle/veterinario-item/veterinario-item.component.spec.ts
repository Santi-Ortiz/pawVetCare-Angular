import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioItemComponent } from './veterinario-item.component';

describe('VeterinarioItemComponent', () => {
  let component: VeterinarioItemComponent;
  let fixture: ComponentFixture<VeterinarioItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioItemComponent]
    });
    fixture = TestBed.createComponent(VeterinarioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
