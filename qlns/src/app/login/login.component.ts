import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { email: '', password: '' };  // Change username to email
  errorMessage: string = '';  // To store error messages
  isSubmitting: boolean = false;  // Tracks if the form is being submitted

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Submit the login form
  async onSubmit(): Promise<void> {
    this.errorMessage = ''; // Clear previous error messages

    // Basic validation to check if fields are empty
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Vui lòng nhập cả email và mật khẩu.';
      return; // Stop execution if form is invalid
    }

    this.isSubmitting = true; // Start the login process

    try {
      // Call the login method from AuthService
      const response: any = await this.authService.login(this.credentials).toPromise();

      if (response?.message === 'Đăng nhập thành công.') {
        // Store user data in localStorage upon successful login
        localStorage.setItem('userEmail', response?.user?.email || this.credentials.email);
        localStorage.setItem('userRole', response?.user?.vaiTro || '');

        // Redirect to the employee management page
        this.router.navigate(['/employee-management']);
      } else {
        // Handle unexpected response or failure
        this.errorMessage = response?.message || 'Phản hồi không xác định từ máy chủ.';
      }
    } catch (error: any) {
      this.isSubmitting = false; // Stop the loading indicator

      // Handle specific HTTP status codes
      if (error?.status === 401) {
        this.errorMessage = 'Email hoặc mật khẩu không chính xác.';
      } else if (error?.status === 500) {
        this.errorMessage = 'Lỗi hệ thống. Vui lòng thử lại sau.';
      } else if (error?.status === 0) {
        this.errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
      } else {
        this.errorMessage = error?.error?.message || 'Lỗi kết nối. Vui lòng thử lại.';
      }
    } finally {
      this.isSubmitting = false; // Ensure the form submission state is reset
    }
  }

  // Handle exit action and navigate to the home page
  onExit(): void {
    this.router.navigate(['/home']);
  }
}
