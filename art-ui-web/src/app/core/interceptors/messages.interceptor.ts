import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AlertService } from 'app/shared/services/alert.service';

@Injectable()
export class MessagesInterceptor implements HttpInterceptor {

    constructor(private alertService: AlertService) { }

    private getHttpStatusCode(event: any): number {
        const httpStatusCode: number = event ? event.status : 0;
        return httpStatusCode;
    }

    private getMessage(event: any): string {
        let _message: string;

        if (event) {
            // ErrorResponse
            if (event instanceof HttpErrorResponse) {
                const code = this.getHttpStatusCode(event);

                switch (code) {
                    case 0:
                        _message = 'Por favor, verifique sua conexão!';
                        break;

                    case 400:
                        _message = event.error.message ? event.error.message : event.error;
                        break;

                    case 500:
                        _message = event.statusText;
                        break;

                    default:
                        _message = 'Erro!';
                        break;
                }

                _message = _message ? _message : 'Erro!';
            } else {
                _message = event.body ? event.body.message : event.statusText;
                _message = _message ? _message : 'OK!'
            }
        }

        return _message;
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .do((event: any) => {
                const message = this.getMessage(event);
                const code = this.getHttpStatusCode(event);

                // Implemente aqui outros HTTP Status Codes:
                // Por favor, coloque em ordem numerica para facilitar o desenvolvimento
                // Para mas HTTP Status Codes, verifique o link https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

                switch (code) {
                    case 200: // OK
                        if (req.method !== 'GET') {
                            this.alertService.success(message);
                        }
                        break;

                    case 201: // Created
                        this.alertService.success(message);
                        break;

                    default:
                        // Do Nothing
                        break;
                }
            }, err => {
                console.log('Message Interceptor');
                console.log('Error');
                console.log(err);

                const code = this.getHttpStatusCode(err);
                console.log(code);
                const title = code ? 'Erro!' : 'Conexão Recusada!';
                const message = this.getMessage(err);
                this.alertService.error(message);
            });
    }
}
