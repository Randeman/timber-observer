import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userData: any;

  constructor(private authService: AuthService) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  get userFullName() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user.displayName;
  }




}
