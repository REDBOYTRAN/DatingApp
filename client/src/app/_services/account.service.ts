import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from './../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  

  constructor(private http: HttpClient) { }

  login(model) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((reponse: User) => {
        const user = reponse;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user))
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
  }
}
