import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Lấy email từ localStorage khi trang được tải
    this.userEmail = localStorage.getItem('userEmail');
  }

  onLogout(): void {
    // Xóa email khỏi localStorage khi người dùng đăng xuất
    localStorage.removeItem('userEmail');
    // Điều hướng về trang đăng nhập
    this.router.navigate(['/login']);
  }
}