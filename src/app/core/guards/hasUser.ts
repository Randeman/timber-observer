import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';

export const hasUserGuard: CanActivateFn = (route, state) => {

    const isLoggedIn = inject(AuthService).isLoggedIn;

    if (!isLoggedIn) {
      return inject(Router).createUrlTree(["/auth/login"]);
    }
    return isLoggedIn;
};