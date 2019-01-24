
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { SessionService } from 'app/shared/services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.sessionService.isLoggedIn()) {

            const loggedUser = this.sessionService.getLoggedUser();
            // const token = loggedUser.AuthToken;
            const token = '';

            // Caso a autenticação for Bearer
            const headers = request.headers.set('Authorization', `Bearer ${token}`);

            request = request.clone({ headers, setParams: { ts: '' + (new Date()).getTime() } });
        }

        return next.handle(request);
    }
}
