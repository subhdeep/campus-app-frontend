import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { User } from 'src/app/models/user';
import { LoginCred } from 'src/app/models/login-cred';
import { switchMap, map } from 'rxjs/operators';

interface LoginResponse {
  username: string;
}

interface SearchResponse {
  n: string;
  i: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginCred: LoginCred): Observable<User> {
    return this.http.post<LoginResponse>('/api/user/login', loginCred).pipe(
      switchMap(res =>
        this.http
          .get<SearchResponse>('https://search.pclub.in/api/student', {
            params: {
              username: res.username,
            },
          })
          .pipe(
            map(v => {
              return {
                username: res.username,
                name: v.n,
                roll: v.i,
              };
            })
          )
      )
    );
  }

  logout() {
    return of(true);
  }
}
