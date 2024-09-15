import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodasLasMascotasComponent } from './ver-todas-las-mascotas.component';

describe('VerTodasLasMascotasComponent', () => {
  let component: VerTodasLasMascotasComponent;
  let fixture: ComponentFixture<VerTodasLasMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerTodasLasMascotasComponent]
    });
    fixture = TestBed.createComponent(VerTodasLasMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
