import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  
  constructor(private http: HttpClient) { }
  
  login(email: string, password: string): Observable<any> {
    // Pour le développement, simuler une connexion réussie
    // Dans un environnement de production, remplacez cette partie par un appel API réel
    return of({
      token: 'mock-jwt-token',
      user: {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin'
      }
    }).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
      })
    );
    
    // Version API réelle (à décommenter et modifier quand prêt)
    /*
    return this.http.post<any>('your-api-url/auth/login', { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        })
      );
    */
  }
  
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  
  getCurrentUser(): any {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}