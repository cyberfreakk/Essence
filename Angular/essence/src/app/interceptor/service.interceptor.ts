import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
  client_id = "e1de244a6de948f580f290621762f1e2"; 
  client_secret = "ef829dd4696d4eceb24aa608974b9fa7";
  TOKEN = "https://accounts.spotify.com/api/token";

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url == this.TOKEN){
      request = request.clone({headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded')});
      request = request.clone({headers: request.headers.set('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret))});
    }
    else{
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem("access_token"))});
    }
    return next.handle(request);
  }
}
