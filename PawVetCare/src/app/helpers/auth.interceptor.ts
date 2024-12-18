import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem('authToken');

    if(token){
      const clone = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      
    return next.handle(clone);
    }


    return next.handle(request);
  }
}
