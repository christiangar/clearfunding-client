import { Observable } from 'rxjs/Rx';
import { User } from './../models/user.model';
import { Http, RequestOptions } from '@angular/http';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService extends BaseApiService {
  private static readonly USERS_API = `${BaseApiService.BASE_API}/users`;

  constructor(private http: Http) {
    super();
  }

  create(user: User): Observable<User> {
    return this.http.post(UsersService.USERS_API, user.asFormData(), new RequestOptions({ withCredentials: true }))
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }
  get(id): Observable<User> {
    return this.http.get(`${UsersService.USERS_API}/${id}`, BaseApiService.defaultOptions)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }
  pair(code, user: User): Observable<User> {
    return this.http.put(`${UsersService.USERS_API}/${user.id}/latch`, JSON.stringify({code: code}), BaseApiService.defaultOptions)
      .map(res => res.json())
      .catch( error => this.handleError(error));
  }
}
