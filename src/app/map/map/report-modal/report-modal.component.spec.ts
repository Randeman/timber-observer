import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportModalComponent } from './report-modal.component';

describe('ModalComponent', () => {
  let component: ReportModalComponent;
  let fixture: ComponentFixture<ReportModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportModalComponent]
    });
    fixture = TestBed.createComponent(ReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
