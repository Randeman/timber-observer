import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';

export const hasUserGuard: CanActivateFn = (route, state) => {

  return inject(AuthService).isLoggedIn ? true : inject(Router).createUrlTree(["/**"]);

};