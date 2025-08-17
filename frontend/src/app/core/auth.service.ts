import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  login(payload: { username: string; password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.base}/login`, payload).pipe(
      tap(res => localStorage.setItem('token', res.access_token))
    );
  }

  signup(payload: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.base}/signup`, payload);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }
}
