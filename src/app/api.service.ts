import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, mergeMap, tap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private http: HttpClient) { }

  private getTickets(): any {
    return this.http.get(`api-iag/search.cgi`);


  };

  getFullTickets() {
    return this.getTickets().pipe(map((data: any) => data.records),
      mergeAll(), 
      mergeMap((t: any) =>
        this.getFullData(t.id).pipe(map((data) => ({ ...t, ...data })))
      ),
      toArray()
    )

  }

  private getFullData(id: string) {
    return this.http.get(`api-iag/get.cgi?lng=bg&session=000&user_id=0&ticket_id=${id}&digest=xxxn`)  
  }


}


