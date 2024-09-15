import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasLasMascotasComponent } from './todas-las-mascotas.component';

describe('TodasLasMascotasComponent', () => {
  let component: TodasLasMascotasComponent;
  let fixture: ComponentFixture<TodasLasMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodasLasMascotasComponent]
    });
    fixture = TestBed.createComponent(TodasLasMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
