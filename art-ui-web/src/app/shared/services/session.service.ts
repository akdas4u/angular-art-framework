import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { StorageService } from './storage.service';

@Injectable()
export class SessionService {
  private endpoint: string;
  private authTokenKey: string;
  private userKey: string;

  constructor(
    public http: HttpClient,
    public storageService: StorageService) {
    this.endpoint = environment.apiUrl;
    this.authTokenKey = environment.authTokenKey;
    this.userKey = environment.userTokenKey;
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const user = this.getLoggedUser();

    if (user && token) {
      return true;
    }

    return false;
  }

  public isAdmin(): boolean {
    let isAdmin = false;

    const isLoggedIn = this.isLoggedIn();
    if (isLoggedIn) {
      const loggedUser = this.getLoggedUser();
      if (loggedUser) {
        // Deixando todos os usuário como administrador apenas para testes
        isAdmin = true;
        // Mas o correto é obter o valor do token
        // isAdmin = loggedUser.isAdmin;
      }
    }

    return isAdmin;
  }

  public getLoggedUser() {
    return this.storageService.getItem(this.userKey);
  }

  public setLoggedUser(user: any) {
    this.storageService.setItem(this.userKey, user);
  }

  public removeLoggedUser() {
    this.storageService.removeItem(this.userKey);
  }

  public getToken() {
    return this.storageService.getItem(this.authTokenKey);
  }

  public setToken(token: string) {
    this.storageService.setItem(this.authTokenKey, token);
  }

  public removeToken() {
    this.storageService.removeItem(this.authTokenKey);
  }
}
