import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // Đảm bảo đã import Observable

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private apiUrl = 'https://localhost:7120/api/Employee/';  // Địa chỉ API của bạn

  constructor(private http: HttpClient) {}

  // Phương thức trả về Observable
  getEmployeeDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);  // Đảm bảo trả về Observable
  }
}
