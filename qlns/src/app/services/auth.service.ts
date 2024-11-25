import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Ensure that AuthService is provided in the root module
})
export class AuthService {
  private apiUrl = 'https://localhost:7120/api'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Register a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);  // Corrected string interpolation
  }

  // Login
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials); // Corrected string interpolation
  }

  // Reset password
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data); // Corrected string interpolation
  }
}
