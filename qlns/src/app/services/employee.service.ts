import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
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

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7120/api/Employee'; // URL API backend của bạn

  constructor(private http: HttpClient) {}

  /**
   * Lấy danh sách nhân viên
   * @returns Observable<Employee[]> - Danh sách nhân viên
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  /**
   * Thêm một nhân viên mới
   * @param employee - Dữ liệu nhân viên cần thêm
   * @returns Observable<Employee> - Nhân viên vừa được thêm
   */
  addEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(`${this.apiUrl}/addEmployee`, employee, { headers });
  }
  // addEmployee(employee: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/addEmployee`, employee);
  // }
  
  /**
   * Cập nhật thông tin một nhân viên
   * @param id - ID của nhân viên
   * @param employee - Dữ liệu nhân viên cần cập nhật
   * @returns Observable<Employee> - Nhân viên đã được cập nhật
   */
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers });
  }

  /** SỬA!!
   * Xóa nhiều nhân viên theo danh sách ID
   * @param employeeIds - Danh sách ID nhân viên cần xóa
   * @returns Observable<void> - Kết quả xóa
   */
  batchDeleteEmployees(employeeIds: number[]): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/batchDelete`, {
      body: employeeIds,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  
}
