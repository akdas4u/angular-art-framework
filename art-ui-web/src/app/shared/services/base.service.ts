import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export abstract class BaseService {
  public endpoint: string;
  public modelName: string;
  public model: any;

  constructor(protected http: HttpClient) {
    this.endpoint = environment.apiUrl;
  }

  protected createHeader(): HttpHeaders {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return headers;
  }

  get(queryString: string) {

    let url = this.endpoint + '/' + this.modelName;

    if (queryString && queryString.length > 0) {
      url = url + '?' + queryString;
    }

    return this.http.get(url, { headers: this.createHeader() });
  }

  getById(id: number) {
    const url = this.endpoint + '/' + this.modelName + '/' + id;
    return this.http.get(url, { headers: this.createHeader() });
  }

  list(/* Paginação */) {
    const url = this.endpoint + '/' + this.modelName;
    return this.http.get(url, { headers: this.createHeader() });
  }

  save(model: any) {
    const isEditMode = model && model.id > 0;
    return isEditMode ? this.edit(model) : this.add(model);
  }

  add(model: any) {
    const url = this.endpoint + '/' + this.modelName;
    return this.http.post(url, model, { headers: this.createHeader() });
  }

  edit(model: any) {
    const url = this.endpoint + '/' + this.modelName;
    return this.http.put(url, model, { headers: this.createHeader() });
  }

  delete(id: number) {
    const url = this.endpoint + '/' + this.modelName + '/' + id;
    return this.http.delete(url, { headers: this.createHeader() });
  }
}
