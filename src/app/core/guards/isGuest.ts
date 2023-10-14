import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';

export const isGuestGuard: CanActivateFn = () => {

  return inject(AuthService).isLoggedIn ? inject(Router).createUrlTree(["/**"]) : true;

};