import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { Observable, first, map } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';

export const isAuthorGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> 
| Promise<boolean | UrlTree> | boolean | UrlTree => {

  inject(ApiService).isAuthorIn(route.params.reportId);
  return inject(ApiService).getIsAuthorIn() ? true : inject(Router).createUrlTree(["/**"]);
    
};