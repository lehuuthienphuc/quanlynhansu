import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // Đảm bảo đã import Observable

<<<<<<< HEAD
export interface Person{
  maNhanVien: number;
  hoTen: string;
  gioitinh: string;
  ngaySinh: string;
  email: string;
  vitri: string;
  ngayVaoLam: string;
  calamviec: string;
  luong: number;
  isSelected?: Boolean;
}
=======
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
<<<<<<< HEAD
  private apiUrl = 'https://localhost:7120/api/Employee';  // Địa chỉ API của bạn
=======
  private apiUrl = 'https://localhost:7120/api/Employee/';  // Địa chỉ API của bạn
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611

  constructor(private http: HttpClient) {}

  // Phương thức trả về Observable
  getEmployeeDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);  // Đảm bảo trả về Observable
  }
<<<<<<< HEAD
  getAllPersons(): Observable<Person[]> {
      return this.http.get<Person[]>(this.apiUrl);
  }
=======
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
}
