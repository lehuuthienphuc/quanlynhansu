import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

interface Staff {
  manhanvien: number;
  hoten: string;
  ngaysinh: string;
  gioiTinh: string;
  ngayvaolam: string;
  email: string;
  vitri: string;
  calamviec: string;
  luong: number;
}

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css'],
})
export class StaffFormComponent implements OnInit {
  staff: Staff = {
    manhanvien: 0,
    hoten: '',
    ngaysinh: '',
    gioiTinh: '',
    ngayvaolam: '',
    email: '',
    vitri: '',
    calamviec: '',
    luong: 0,
  };

  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    // Có thể thêm logic khởi tạo ở đây
    this.staff.ngayvaolam = new Date().toISOString().split('T')[0]; // Set ngày hiện tại
  }

  onSubmit(form: NgForm) {
    if (form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        const employeeData = {
          maNhanVien: this.staff.manhanvien,
          hoTen: this.staff.hoten.trim(),
          ngaySinh: new Date(this.staff.ngaysinh).toISOString(),
          gioiTinh: this.staff.gioiTinh,
          ngayVaoLam: new Date(this.staff.ngayvaolam).toISOString(),
          email: this.staff.email.trim().toLowerCase(),
          viTri: this.staff.vitri.trim(),
          calamviec: this.staff.calamviec.trim(),
          luong: Number(this.staff.luong)
        };

        if (!this.validateEmployeeData(employeeData)) {
          throw new Error('Dữ liệu không hợp lệ');
        }

        this.employeeService.addEmployee(employeeData).subscribe({
          next: (response: any) => {
            this.successMessage = 'Thêm nhân viên thành công!';
            form.resetForm();
            
            // Chuyển về trang danh sách sau 2 giây
            setTimeout(() => {
              this.router.navigate(['/employee-list']);
            }, 2000);
          },
          error: (error: any) => {
            console.error('Lỗi:', error);
            this.handleError(error);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
      } catch (error) {
        this.handleError(error);
        this.isSubmitting = false;
      }
    } else {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin bắt buộc!';
    }
  }

  private validateEmployeeData(data: any): boolean {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      this.errorMessage = 'Email không hợp lệ';
      return false;
    }

    // Validate lương
    if (data.luong <= 0) {
      this.errorMessage = 'Lương phải lớn hơn 0';
      return false;
    }

    // Validate ngày sinh
    const birthDate = new Date(data.ngaySinh);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      this.errorMessage = 'Nhân viên phải từ 18 tuổi trở lên';
      return false;
    }

    // Validate họ tên
    if (data.hoTen.length < 2) {
      this.errorMessage = 'Họ tên phải có ít nhất 2 ký tự';
      return false;
    }

    return true;
  }

  private handleError(error: any) {
    if (error.status === 400) {
      this.errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
    } else if (error.status === 409) {
      this.errorMessage = 'Email đã tồn tại. Vui lòng sử dụng email khác.';
    } else {
      this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại sau.';
    }
  }

  // Reset form
  resetForm(form: NgForm) {
    form.resetForm();
    this.errorMessage = '';
    this.successMessage = '';
  }
}
