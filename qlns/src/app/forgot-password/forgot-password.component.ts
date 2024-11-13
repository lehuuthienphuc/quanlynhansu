import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }
    // Gửi yêu cầu đặt lại mật khẩu đến server
    console.log('Email:', this.email);
    console.log('Mật khẩu mới:', this.newPassword);
    alert('Yêu cầu đặt lại mật khẩu đã được gửi.');
  }

  onCancel() {
    // Xử lý khi nhấn nút Thoát
    console.log('Hủy yêu cầu đặt lại mật khẩu.');
  }
}
