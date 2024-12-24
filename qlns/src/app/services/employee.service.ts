import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  maNhanVien: number;
  hoTen: string;
  gioiTinh: string; // Đã sửa từ 'gioitinh' thành 'gioiTinh' để đúng chuẩn camelCase
  ngaySinh: string;
  email: string;
  viTri: string; // Đã sửa từ 'vitri' thành 'viTri'
  ngayVaoLam: string;
  calamviec: string; // Đã sửa từ 'calamviec' thành 'caLamViec'
  luong: number;
  isSelected?: boolean; // Sử dụng 'boolean' thay vì 'Boolean' (đúng chuẩn TypeScript)
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7120/api/Employee'; // URL API backend

  constructor(private http: HttpClient) { }

  /**
   * Lấy danh sách nhân viên
   * @returns Observable<Employee[]> - Danh sách nhân viên
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Employee>(`${this.apiUrl}/findEmployee?id=${id}`, { headers });
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

  /**
   * Cập nhật thông tin một nhân viên
   * @param id - ID của nhân viên
   * @param employee - Dữ liệu nhân viên cần cập nhật
   * @returns Observable<Employee> - Nhân viên đã được cập nhật
   */
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    console.log("updating emp/..");
    console.log(employee);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers });
  }

  /**
   * Xóa nhiều nhân viên theo danh sách ID
   * @param employeeIds - Danh sách ID nhân viên cần xóa
   * @returns Observable<any> - Kết quả xóa
   */
  batchDeleteEmployees(employeeIds: number[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.request<any>('delete', `${this.apiUrl}/batchDelete`, {
      body: employeeIds,
      headers: headers,
    });
  }
}
