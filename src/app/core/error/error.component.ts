import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errMsg = "";
  apiError$ = this.errorService.apiError$$.asObservable();
  private keepAfterRouteChange = false;
  isVisible: boolean = false;
  
  constructor(private errorService: ErrorService,
    private router: Router) {
      router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterRouteChange) {
                // only keep for a single route change
                this.keepAfterRouteChange = false;
            } else {
                // clear error messages
                this.errorService.apiError$$.next(null);
            }
        }
    });
    }


  
  ngOnInit(): void {
     this.apiError$.subscribe((err: any) => {     
      this.errMsg = err?.message;
      this.isVisible = true;
     });
   
  }

  setInvisible() {
    this.isVisible = false;
  }

  

}