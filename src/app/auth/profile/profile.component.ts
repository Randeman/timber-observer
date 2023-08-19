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
    this.getUserInfo();
  }

  changeEditMode() {
    this.isEditable = !this.isEditable;
  }

  onEditProfile(form: NgForm): void {
    if (form.invalid) { return };
    const { firstName, lastName, phone, truck1, truck2, truck3, truck4 } = form.value;
    const trucks = [truck1, truck2, truck3, truck4].filter( t => t !== "");
    this.authService.editUserProfile(firstName, lastName, phone, trucks);
    this.getUserInfo();
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
        .slice(0, 25);
    })

  }

  onDefaultSearch(trucks): void {

    const [truck1, truck2, truck3, truck4] = trucks;
    this.apiService.getStoredTickets().subscribe(data => {
      this.tickets = Object.values(data)
        .filter(ticket => 
          trucks.some(t => t.toLowerCase() === ticket.vehicle_plates_number?.toLowerCase()
            || t.toLowerCase() === ticket.trailer_plates_number?.toLowerCase())
        )
        .sort((a, b) => b.id - a.id)
        .slice(0, 25)
    })

  }

  onOpenTicket(ticket) {
    const open = this.modalService.open(TicketModalComponent);
    open.componentInstance.data = ticket;
  }

  getUserInfo() {
    this.authService.getUserProfile()
      .subscribe(data => {
        this.userData = data;
        if (this.userData?.trucks) {
          this.trucks = [...this.trucks, ...Object.values(this.userData?.trucks)];
          this.onDefaultSearch(this.trucks);
        }
        if(this.isEditable){
          this.changeEditMode();
        }
      }
      );

  }

}
