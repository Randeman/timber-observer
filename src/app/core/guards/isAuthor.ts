import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { Observable, catchError, delay, first, map, of, take, tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';

export const isAuthorGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> | boolean | UrlTree => {

      

    return inject(ApiService).isAuthorIn(route.params.reportId).pipe(delay(3000),take(1),tap((x) =>

      {return x ? true : inject(Router).createUrlTree(["/**"]);}
    ));

};