import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        //debugger;
        let token = window.localStorage.getItem('token');
        if(token)
        {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer '+token
                }
            });
        }
        return next.handle(request);
    }
}