import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDashboardComponent } from './ver-dashboard.component';

describe('VerDashboardComponent', () => {
  let component: VerDashboardComponent;
  let fixture: ComponentFixture<VerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerDashboardComponent]
    });
    fixture = TestBed.createComponent(VerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
