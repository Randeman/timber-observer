import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, mergeMap, take, toArray, delay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { ErrorService } from './core/error/error.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {

  sub!: Subscription;
  isAuthor: boolean;
  reportData;

  constructor(private http: HttpClient,
    private db: AngularFireDatabase,
    private errorService: ErrorService) { }


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

  getStoredTickets() {
    return this.http.get(
      `databaseURL/e_tickets/.json`);

  }

  storeTickets(id: string, data: any) {
    this.sub = this.http.put(
      `databaseURL/e_tickets/${id}.json`,
      { ...data }).subscribe();

  }

  getInsurance(vehicleNumber: string) {

    const body = { dkn: this.cyrlat(vehicleNumber), rama: "", stiker: "", seria: "", date: moment().format("DD/MM/YYYY"), send: "търси" };
    return this.http.post(
      `api-ins`,
      new URLSearchParams(body),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }, responseType: 'text' })
  }

  getPlace(coordinates: string) {

    const [lat, lng] = coordinates.split(", ");

    return this.http.get(`api-geo?lat=${lat}&lng=${lng}&maxRows=1&username=rutor`)

  }

  storeReport(reportData) {

    return this.http.post(
      `databaseURL/reports/.json`,
      { ...reportData });

  }

  editReport(id, reportData) {

    return this.http.put(
      `databaseURL/reports/${id}/.json`,
      { ...reportData });

  }


  getReports() {
    return this.http.get(
      `databaseURL/reports/.json`);
  }

  getReport(id) {
    return this.http.get(
      `databaseURL/reports/${id}/.json`);
  }

  deleteReport(id) {
    return this.http.delete(
      `databaseURL/reports/${id}/.json`
    )
  }

  isAuthorIn(id): Observable<any> {
    return new Observable((o) => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.getReport(id).subscribe((data) => {
          o.next(user.uid === data["author"]);
        });
      } catch (err) {
        this.errorService.setError(err)
        o.next(false);
      }
    });
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



