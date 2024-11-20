import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Thêm Router để điều hướng sau khi đăng xuất

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Kiểm tra email trong localStorage khi ứng dụng tải
    this.userEmail = localStorage.getItem('userEmail');
  }

  logout(): void {
    // Xóa email khỏi localStorage khi đăng xuất
    localStorage.removeItem('userEmail');
    // Điều hướng về trang đăng nhập
    this.router.navigate(['/login']);
  }
}