import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService extends BaseService {
    model: any;
    modelName = 'usuario';

    constructor(protected http: HttpClient) {
        super(http);
    }

    register(model: any) {
        // const url = this.endpoint + '/' + this.modelName + '/register' + ;
        // return this.http.post(url, model, { headers: this.createHeader() });
    }

    login(model: any) {
        // const url = this.endpoint + '/' + this.modelName + '/login' + ;
        // return this.http.post(url, model, { headers: this.createHeader() });

        const obs: Observable<boolean> = Observable.create(observer => {
            const url = this.endpoint + '/' + this.modelName;
            return this.http.get(url, { headers: this.createHeader() }).subscribe((resp: any[]) => {
                const user = resp.find(u => u.login === model.login && u.password === model.password);
                observer.next(user);
                observer.complete();
            });
        });

        return obs;
    }

    logout(model: any) {
        // const url = this.endpoint + '/' + this.modelName + '/logout' + ;
        // return this.http.post(url, model, { headers: this.createHeader() });

        const obs: Observable<boolean> = Observable.create(observer => {
            const url = this.endpoint + '/' + this.modelName;
            return this.http.get(url, { headers: this.createHeader() }).subscribe((resp: any[]) => {
                const user = resp.find(u => u.login === model.login && u.password === model.password);
                observer.next(user);
                observer.complete();
            });
        });

        return obs;
    }
}
