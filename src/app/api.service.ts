import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, mergeAll, mergeMap, reduce, take, tap, toArray } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {
  
  sub!: Subscription;
  
  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private getTickets(): any {
    return this.http.get(`api-iag/search.cgi`);
  };

  private getFullData(id: string) {
    return this.http.get(`api-iag/get.cgi?lng=bg&session=000&user_id=0&ticket_id=${id}&digest=xxxn`)  
  }

  getFullTickets() {
    return this.getTickets()
    .pipe(
      map((data: any) => data.records),
      mergeAll(), 
      mergeMap((t: any) =>
        this.getFullData(t.id).pipe(map((data) => ({ ...t, ...data })))              
      ),
      take(5),
      toArray()
    )

  }

  storeTickets(id: string, data: any) {
    this.sub = this.http.put(
        `https://elemental-shine-380103-default-rtdb.europe-west1.firebasedatabase.app/e_tickets/${id}.json`,
        { ...data }).subscribe()
        
  }

}


