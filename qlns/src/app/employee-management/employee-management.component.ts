import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent {
  userEmail: string | null = localStorage.getItem('userEmail'); // Lấy email người dùng từ localStorage hoặc sessionStorage
selectedEmployeeId: any|string;

  constructor(private router: Router) {}

  // Hàm đăng xuất
  onLogout(): void {
    localStorage.removeItem('userEmail'); // Xóa email khỏi localStorage
    this.userEmail = null; // Cập nhật lại giá trị userEmail
    this.router.navigate(['/login']); // Điều hướng về trang đăng nhập
  }
}
