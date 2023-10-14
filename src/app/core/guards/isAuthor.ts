import { inject } from '@angular/core';
import { CanActivateFn, UrlTree, createUrlTreeFromSnapshot } from "@angular/router";
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/api.service';

export const isAuthorGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> | boolean | UrlTree => {
  
    return inject(ApiService).isAuthorIn(route.params.reportId).pipe(map((x) =>
    {
      if(x) {return x}
      return createUrlTreeFromSnapshot(route, ["/**"]);
    }
  )) 
};