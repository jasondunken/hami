import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("REQUEST>>> ", request);
    // if (!request.body?.password) {
    //   request = request.clone({ setHeaders: { Authorization: `Token ${this.auth.getToken()}` } });
    // }
    return next.handle(request)
    // .pipe(
    //   filter(event => event instanceof HttpResponse),
    //   tap((event: HttpResponse<any>) => {
    //     // clear token and redirect to / if status code === 401
    //     if (event.status === 401) {
    //       console.log("STATUS.401>>> ", event);
    //       this.auth.logout();
    //     }
    //   })
    // );
  }
}
