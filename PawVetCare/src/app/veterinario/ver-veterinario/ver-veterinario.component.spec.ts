import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVeterinarioComponent } from './ver-veterinario.component';

describe('VerVeterinarioComponent', () => {
  let component: VerVeterinarioComponent;
  let fixture: ComponentFixture<VerVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerVeterinarioComponent]
    });
    fixture = TestBed.createComponent(VerVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
