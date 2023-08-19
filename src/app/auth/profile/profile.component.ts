import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { TicketModalComponent } from 'src/app/map/map/modals/ticket-modal/ticket-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any;
  isEditable: boolean = false;
  tickets: any;
  trucks = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.authService.getUserProfile()
      .subscribe(data => {
        this.userData = data;
        if (this.userData?.trucks) {
          this.trucks = [...this.trucks, ...Object.values(this.userData?.trucks)];
          this.onDefaultSearch(this.trucks);

        }
      }
      );

  }

  changeEditMode() {
    this.isEditable = !this.isEditable;
  }

  onEditProfile(form: NgForm): void {
    if (form.invalid) { return };
    const { firstName, lastName, phone, truck1, truck2, truck3, truck4 } = form.value;
    this.authService.editUserProfile(firstName, lastName, phone, truck1, truck2, truck3, truck4);
    this.changeEditMode();
    this.router.navigate(['/auth/profile']);
  }

  onSearch(formSearch: NgForm): void {

    const { truck, sender, destination } = formSearch.value;
    this.apiService.getStoredTickets().subscribe(data => {
      this.tickets = Object.values(data)
        .filter(ticket =>
          (ticket.vehicle_plates_number?.toLowerCase().includes(truck?.toLowerCase())
            || ticket.trailer_plates_number?.toLowerCase().includes(truck?.toLowerCase()))
          && (ticket.podelenie?.toLowerCase().includes(sender?.toLowerCase())
            || ticket.issued?.toLowerCase().includes(sender?.toLowerCase()))
          && ticket.destination?.toLowerCase().includes(destination?.toLowerCase())

        )
        .sort((a, b) => b.id - a.id)
        .slice(0, 25)
    })

    this.router.navigate(['/auth/profile']);
  }

  onDefaultSearch(trucks): void {

    const [truck1, truck2, truck3, truck4] = trucks;
    this.apiService.getStoredTickets().subscribe(data => {
      this.tickets = Object.values(data)
        .map(ticket => {
          if (
            (ticket.vehicle_plates_number?.toLowerCase().includes(truck1?.toLowerCase() || "") || ticket.trailer_plates_number?.toLowerCase().includes(truck1?.toLowerCase() || ""))
            || (ticket.vehicle_plates_number?.toLowerCase().includes(truck2?.toLowerCase() || "") || ticket.trailer_plates_number?.toLowerCase().includes(truck2?.toLowerCase() || ""))
            || (ticket.vehicle_plates_number?.toLowerCase().includes(truck3?.toLowerCase() || "") || ticket.trailer_plates_number?.toLowerCase().includes(truck3?.toLowerCase() || ""))
            || (ticket.vehicle_plates_number?.toLowerCase().includes(truck4?.toLowerCase() || "") || ticket.trailer_plates_number?.toLowerCase().includes(truck4?.toLowerCase() || ""))
          ) {
            return ticket;
          }
        })
        .sort((a, b) => b.id - a.id)
        .slice(0, 25)
    })

    this.router.navigate(['/auth/profile']);
  }

  onOpenTicket(ticket) {
    const open = this.modalService.open(TicketModalComponent);
    open.componentInstance.data = ticket;
  }

}
