import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketModalComponent } from './ticket-modal.component';

describe('ModalComponent', () => {
  let component: TicketModalComponent;
  let fixture: ComponentFixture<TicketModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketModalComponent]
    });
    fixture = TestBed.createComponent(TicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
