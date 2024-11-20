import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Đảm bảo đúng đường dẫn

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = ''; // Biến để lưu thông báo lỗi

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Đảm bảo tiêm AuthService
    private router: Router  // Inject Router để điều hướng
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Khi người dùng submit form
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
  
      this.authService.login(credentials).subscribe(
        (response: any) => {
          if (response && response.Message === "Đăng nhập thành công.") {
            localStorage.setItem('userEmail', credentials.email);  // Lưu email vào localStorage
            this.router.navigate(['/employee-management']);  // Điều hướng đến trang quản lý nhân viên
          }
        },
        (error: any) => {
          // Lấy thông báo lỗi từ backend, nếu có
          this.errorMessage = error?.error?.Message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu.';
        }
      );
    } else {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin đăng nhập.';
    }
  }

  // Thêm phương thức onExit để xử lý khi người dùng nhấn nút "Thoát"
  onExit(): void {
    // Bạn có thể xử lý logic khi thoát, ví dụ như đóng cửa sổ hoặc điều hướng về trang khác
    this.router.navigate(['/home']); // Điều hướng về trang chủ hoặc trang khác
  }
}
