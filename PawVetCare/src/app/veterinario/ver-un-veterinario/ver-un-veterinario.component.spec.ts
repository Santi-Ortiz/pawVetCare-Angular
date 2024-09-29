import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUnVeterinarioComponent } from './ver-un-veterinario.component';

describe('VerUnVeterinarioComponent', () => {
  let component: VerUnVeterinarioComponent;
  let fixture: ComponentFixture<VerUnVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerUnVeterinarioComponent]
    });
    fixture = TestBed.createComponent(VerUnVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
