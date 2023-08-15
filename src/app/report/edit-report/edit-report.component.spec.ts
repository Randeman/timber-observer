import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportComponent } from './edit-report.component';

describe('EditReportComponent', () => {
  let component: EditReportComponent;
  let fixture: ComponentFixture<EditReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReportComponent]
    });
    fixture = TestBed.createComponent(EditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
