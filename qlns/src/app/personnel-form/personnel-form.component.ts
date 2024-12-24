import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, EmployeeService } from '../services/employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';


@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrls: ['./personnel-form.component.css'],
})
export class PersonnelFormComponent {
  personnel = {
    maNhanVien: 0,
    hoTen: '',
    gioiTinh: '',
    ngaySinh: '',
    email: '',
    viTri: '',
    calamviec: '',
    luong: 0, // Khởi tạo giá trị mặc định là 0
    ngayVaoLam: '',
  };

  constructor(private router: Router, private http: HttpClient, private employeeService: EmployeeService) {
    let extra = router.getCurrentNavigation()?.extras;
    console.log(extra)
    this.employeeService = new EmployeeService(this.http);
    this.employeeService.getEmployee(extra?.state?.['id']).subscribe((response: any) => {
      console.log(response)
      this.personnel = response;
    });

  }

  /**
   * Xử lý sự kiện khi người dùng nhấn nút lưu
   */
  onSubmit(): void {
    if (this.isValidForm()) {

      this.employeeService.updateEmployee(Number(this.personnel.maNhanVien), this.personnel).subscribe(
        (response: any) => {
          console.log('Employee updated successfully:', response);
          this.router.navigate(['/personnel-details']); // Điều hướng về danh sách nhân viên
        },
        (error: any) => {
          console.error('Error updating employee:', error);
          alert('Có lỗi xảy ra khi cập nhật thông tin nhân viên!');
        }
      );
    } else {
      console.error('Invalid personnel data');
      alert('Vui lòng kiểm tra lại thông tin nhân viên!');
    }
  }


  /**
   * Xử lý sự kiện khi người dùng nhấn nút hủy
   */
  onCancel(): void {
    if (confirm('Bạn có chắc chắn muốn hủy bỏ các thay đổi?')) {
      this.router.navigate(['/personnel-details']); // Điều hướng về danh sách nhân viên
    }
  }

  /**
   * Kiểm tra tính hợp lệ của biểu mẫu
   * @returns boolean - true nếu hợp lệ, ngược lại là false
   */
  private isValidForm(): boolean {
    const { maNhanVien, hoTen, email, ngaySinh, viTri, ngayVaoLam } = this.personnel;

    // Kiểm tra các trường bắt buộc
    if (!maNhanVien || !hoTen || !email || !ngaySinh || !viTri || !ngayVaoLam) {
      return false;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }
}
