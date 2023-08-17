import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from './core/error/error.service';
import { environment } from "../environments/environment"

const databaseURL = environment.firebase.databaseURL;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router, private errorService: ErrorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (request.url.startsWith("databaseURL")) {
      request = request.clone({
        url: request.url.replace("databaseURL", databaseURL),
        withCredentials: false
      })
    }
    else {
      request = request.clone({
        withCredentials: false
      })
    }
    return next.handle(request)
    .pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 0) {
          this.router.navigate(['/']);
        } else {
          this.errorService.setError(err);
        }
        return [err];
      })
    );
  }
  
}

export const AppInterceptorProvider: Provider = {

  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true

}
