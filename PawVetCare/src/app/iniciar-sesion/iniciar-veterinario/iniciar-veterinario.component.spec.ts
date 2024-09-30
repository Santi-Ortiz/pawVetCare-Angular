import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarVeterinarioComponent } from './iniciar-veterinario.component';

describe('IniciarVeterinarioComponent', () => {
  let component: IniciarVeterinarioComponent;
  let fixture: ComponentFixture<IniciarVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciarVeterinarioComponent]
    });
    fixture = TestBed.createComponent(IniciarVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
