import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Đảm bảo rằng bạn đã khai báo providedIn: 'root' để Angular tự động cung cấp AuthService
})
export class AuthService {
  private apiUrl = 'http://localhost:7120/api/auth'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Đăng ký người dùng mới
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Đăng nhập
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Đặt lại mật khẩu
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
}