import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { SessionService } from './session.service';
import { AlertService } from './alert.service';
import { StorageService } from './storage.service';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService {
  private endpoint: string;
  private authConfig: any;

  model: any;
  modelName = 'usuario';

  constructor(
      protected http: HttpClient,
      private router: Router,
      public alertService: AlertService,
      public sessionService: SessionService) {
      this.endpoint = environment.apiUrl;
      this.authConfig = environment.authConfig;
  }

  private createHeader(): HttpHeaders {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return headers;
  }

  register(model: any) {
      const url = this.endpoint + '/' + this.modelName
      return this.http.post(url, model, { headers: this.createHeader() });
  }

  login(usuario: string, senha: string) {
      debugger;
      const _body = new URLSearchParams();
      _body.append('username', usuario);
      _body.append('password', senha);
      _body.append('grant_type', 'password');
      _body.append('client_id', this.authConfig.clientId);
      _body.append('client_secret', this.authConfig.secret);

      const _headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

      const req = this.http.post(this.authConfig.url, _body.toString(), { headers: _headers }).subscribe((res: any) => {

          const hasToken = res && res.access_token;
          if (hasToken) {
              const token = res.access_token;
              this.sessionService.setToken(token);

              const user = this.decodeToken();
              this.sessionService.setLoggedUser(user);

              this.router.navigateByUrl('dashboard');
          } else {
              this.router.navigateByUrl('auth/login');
          }
      },
          err => {
              this.sessionService.removeToken();
              this.alertService.error('O email ou senha digitados estão incorretos!');
          }
      );
  }

  isLoggedIn() {
      let hasToken = false;
      let hasAccessToken = false;
      const token = this.sessionService.getToken();
      if (token) {
          hasToken = true;
      }

      if (tokenNotExpired('', token)) {
          hasAccessToken = true;
      }

      return hasToken && hasAccessToken;
  }

  public userName(): string {
      const user = this.sessionService.getLoggedUser();

      if (!user) {
          return 'Desconhecido';
      }

      return user.given_name;
  }

  logout() {
      // this.oauthService.logOut();
      this.sessionService.removeToken();
      this.sessionService.removeLoggedUser();
      this.router.navigateByUrl('auth/login');
      this.alertService.success('Sua sessão foi desconectada com sucesso!');
  }

  decodeToken() {
      const token = this.sessionService.getToken();
      if (tokenNotExpired('', token)) {
          const _jwtHelper: JwtHelper = new JwtHelper();
          const user = _jwtHelper.decodeToken(token);

          return user;
      } else {
          this.sessionService.removeToken();
          this.router.navigateByUrl('auth/login');
      }
  }
}
