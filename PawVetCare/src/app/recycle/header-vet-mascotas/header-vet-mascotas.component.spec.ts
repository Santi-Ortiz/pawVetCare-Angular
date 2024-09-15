import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVetMascotasComponent } from './header-vet-mascotas.component';

describe('HeaderVetMascotasComponent', () => {
  let component: HeaderVetMascotasComponent;
  let fixture: ComponentFixture<HeaderVetMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderVetMascotasComponent]
    });
    fixture = TestBed.createComponent(HeaderVetMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
