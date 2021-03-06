import { environment } from "../../../environments/environment";

import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private username;

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService, 
    private router: Router
    ) {}

  //'api/token/'
  //'api/token/refresh/'

  test(): Observable<any> {
    return this.http.post(environment.apiUrl + 'api/token/', { "username": "testuser", "password": "testpassword" })
    .pipe(
      catchError((err) => {
        return of({ error: "failed to register user!" });
      })
    );
  }
  test2(): Observable<any> {
    return this.http.post(environment.apiUrl + 'api/token/refresh/', { "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE1MDc0Nzk2LCJqdGkiOiI4NzFjMTgwOWY2NWQ0ZGJhYTY2ZmY4NzRmZmQzNDVhYyIsInVzZXJfaWQiOjN9.a2yVZ-pyCWSNVLEhg4kcRdqCzQWVQuhQSzwUo_ER--8" })
    .pipe(
      catchError((err) => {
        return of({ error: "failed to refresh token!" });
      })
    );
  }

  registerNewUser(username: string, password: string, email: string): Observable<any> {
    const newUser = {
      username,
      password,
      email,
    };
    return this.http.post<any>(environment.apiUrl + "auth/users/", newUser)
      .pipe(
        catchError((err) => {
          return of({ error: "failed to register user!" });
        })
      );
  }

  login(username: string, password: string): Observable<any> {
    const login = {
      username,
      password,
    };
    return this.http.post<any>(environment.apiUrl + "api/token/", login)
      .pipe(
        tap((response: any) => {
          this.cookieService.set('JWT_TOKEN', response.access);
          this.cookieService.set('JWT_REFRESH_TOKEN', response.refresh);
          this.router.navigateByUrl('home');
        }),
        catchError((err) => {
          return of({ error: "falied to login user!" });
        })
      );
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.username = '';
    this.router.navigateByUrl('');
  }

  getUser(): Observable<any> {
    return this.http.get(environment.apiUrl + "auth/users/me/").pipe(
      tap((user) => {
        this.username = user;
      }),
      catchError((err) => {
        return of({ error: "failed to retrieve user!" });
      })
    );
  }

  getUsername(): string {
    return this.username;
  }

  userIsAuthenticated(): boolean {
    return this.cookieService.check('JWT_TOKEN');
  }

  getToken(): string {
    return this.cookieService.get('JWT_TOKEN');
  }

  getAuthRefreshToken(): string {
    return this.cookieService.get('JWT_REFRESH_TOKEN"');
  }
}
