import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  maNhanVien: number;
  hoTen: string;
<<<<<<< HEAD
  gioiTinh: string; // Đã sửa từ 'gioitinh' thành 'gioiTinh' để đúng chuẩn camelCase
  ngaySinh: string;
  email: string;
  viTri: string; // Đã sửa từ 'vitri' thành 'viTri'
  ngayVaoLam: string;
  calamviec: string; // Đã sửa từ 'calamviec' thành 'caLamViec'
  luong: number;
  isSelected?: boolean; // Sử dụng 'boolean' thay vì 'Boolean' (đúng chuẩn TypeScript)
=======
  gioitinh: string;
  ngaySinh: string;
  email: string;
  vitri: string;
  ngayVaoLam: string;
  calamviec: string;
  luong: number;
  isSelected?: Boolean;
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
<<<<<<< HEAD
  private apiUrl = 'https://localhost:7120/api/Employee'; // URL API backend

  constructor(private http: HttpClient) { }
=======
  private apiUrl = 'https://localhost:7120/api/Employee'; // URL API backend của bạn

  constructor(private http: HttpClient) {}
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611

  /**
   * Lấy danh sách nhân viên
   * @returns Observable<Employee[]> - Danh sách nhân viên
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

<<<<<<< HEAD
  getEmployee(id: number): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Employee>(`${this.apiUrl}/findEmployee?id=${id}`, { headers });
  }

=======
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
  /**
   * Thêm một nhân viên mới
   * @param employee - Dữ liệu nhân viên cần thêm
   * @returns Observable<Employee> - Nhân viên vừa được thêm
   */
  addEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(`${this.apiUrl}/addEmployee`, employee, { headers });
  }
<<<<<<< HEAD

=======
  // addEmployee(employee: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/addEmployee`, employee);
  // }
  
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
  /**
   * Cập nhật thông tin một nhân viên
   * @param id - ID của nhân viên
   * @param employee - Dữ liệu nhân viên cần cập nhật
   * @returns Observable<Employee> - Nhân viên đã được cập nhật
   */
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
<<<<<<< HEAD
    console.log("updating emp/..");
    console.log(employee);
=======
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers });
  }

<<<<<<< HEAD
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
=======
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
  
  
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
}
