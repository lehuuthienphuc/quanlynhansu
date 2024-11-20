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
  onSubmit() {
    console.log('Form submitted');  // Kiểm tra xem phương thức có được gọi không
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
  
      // Gọi API đăng nhập
      this.authService.login(credentials).subscribe(
        (response: any) => {  // Chỉ định kiểu cho response
          if (response && response.Message === "Đăng nhập thành công.") {
            // Lưu email vào localStorage
            localStorage.setItem('userEmail', credentials.email);
            // Điều hướng đến trang Employee Management
            this.router.navigate(['/employee-management']);
          }
        },
        (error: any) => {  // Chỉ định kiểu cho error
          console.error('Login failed', error);
          this.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu.'; // Thông báo lỗi
        }
      );
    } else {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin đăng nhập.'; // Thông báo nếu form không hợp lệ
    }
  }
  
}