import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { LoginCred } from 'src/app/models/login-cred';

interface LoginResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginCred: LoginCred): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/user/login', loginCred);
  }

  logout() {
    return this.http.post('/api/user/logout', {});
  }

  check(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>('/api/user/me');
  }
}
