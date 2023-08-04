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

  getInsurance(vehicleNumber: string) {
    const body = { dkn: this.cyrlat(vehicleNumber), rama: "", stiker: "", seria: "", date: "04/08/2023", send: "търси" };
    return this.http.post(
      `api-ins`,
      new URLSearchParams(body),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }, responseType: 'text' })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  cyrlat(vehicleNumber: string) {
    let dkn = vehicleNumber;

    dkn = dkn.replace(/а/g, "A");
    dkn = dkn.replace(/б/g, "B");
    dkn = dkn.replace(/в/g, "B");
    dkn = dkn.replace(/г/g, "");
    dkn = dkn.replace(/д/g, "");
    dkn = dkn.replace(/е/g, "E");
    dkn = dkn.replace(/ж/g, "B");
    dkn = dkn.replace(/з/g, "");
    dkn = dkn.replace(/и/g, "");
    dkn = dkn.replace(/й/g, "");
    dkn = dkn.replace(/к/g, "K");
    dkn = dkn.replace(/л/g, "");
    dkn = dkn.replace(/м/g, "M");
    dkn = dkn.replace(/н/g, "H");
    dkn = dkn.replace(/о/g, "O");
    dkn = dkn.replace(/п/g, "P");
    dkn = dkn.replace(/р/g, "P");
    dkn = dkn.replace(/с/g, "C");
    dkn = dkn.replace(/т/g, "T");
    dkn = dkn.replace(/у/g, "Y");
    dkn = dkn.replace(/ф/g, "");
    dkn = dkn.replace(/х/g, "X");
    dkn = dkn.replace(/ц/g, "C");
    dkn = dkn.replace(/ч/g, "");
    dkn = dkn.replace(/ш/g, "");
    dkn = dkn.replace(/щ/g, "");
    dkn = dkn.replace(/ъ/g, "");
    dkn = dkn.replace(/ь/g, "");
    dkn = dkn.replace(/ю/g, "");
    dkn = dkn.replace(/я/g, "");

    dkn = dkn.replace(/А/g, "A");
    dkn = dkn.replace(/Б/g, "B");
    dkn = dkn.replace(/В/g, "B");
    dkn = dkn.replace(/Г/g, "");
    dkn = dkn.replace(/Д/g, "");
    dkn = dkn.replace(/Е/g, "E");
    dkn = dkn.replace(/Ж/g, "B");
    dkn = dkn.replace(/З/g, "");
    dkn = dkn.replace(/И/g, "");
    dkn = dkn.replace(/Й/g, "");
    dkn = dkn.replace(/К/g, "K");
    dkn = dkn.replace(/Л/g, "");
    dkn = dkn.replace(/М/g, "M");
    dkn = dkn.replace(/Н/g, "H");
    dkn = dkn.replace(/О/g, "O");
    dkn = dkn.replace(/П/g, "P");
    dkn = dkn.replace(/Р/g, "P");
    dkn = dkn.replace(/С/g, "C");
    dkn = dkn.replace(/Т/g, "T");
    dkn = dkn.replace(/У/g, "Y");
    dkn = dkn.replace(/Ф/g, "");
    dkn = dkn.replace(/Х/g, "X");
    dkn = dkn.replace(/Ц/g, "C");
    dkn = dkn.replace(/Ч/g, "");
    dkn = dkn.replace(/Ш/g, "");
    dkn = dkn.replace(/Щ/g, "");
    dkn = dkn.replace(/Ъ/g, "");
    dkn = dkn.replace(/Ь/g, "");
    dkn = dkn.replace(/Ю/g, "");
    dkn = dkn.replace(/Я/g, "");
    return dkn.toUpperCase();
  }

}



