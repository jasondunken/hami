import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { timeout, catchError, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UploaderService {
  constructor(private http: HttpClient) {}

  addSource(source): Observable<any> {
    return this.http
      .post(environment.apiUrl + "api/sources/" + Map + "/", source)
      .pipe(
        timeout(5000),
        tap(),
        catchError((err) => {
          return of({ error: "failed to add new source! ", err });
        })
      );
  }
}
