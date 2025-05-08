import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  
  constructor(private http: HttpClient) { }
  
  login(email: string, password: string): Observable<any> {
    // Dans un environnement de production, remplacez cette partie par un appel API réel
    if (email === 'admin@example.com' && password === 'password') {
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          name: 'Admin User',
          email: email,
          role: 'admin'
        }
      };
      
      localStorage.setItem(this.TOKEN_KEY, mockResponse.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockResponse.user));
      
      return of(mockResponse);
    }
    
    // Simuler une erreur d'authentification
    throw new Error('Invalid credentials');
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