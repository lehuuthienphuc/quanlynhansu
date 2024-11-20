import { Component } from '@angular/core';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent {
  staff = {
    staffCode: '',
    fullName: '',
    dob: '',
    gender: '',
    email: '',
    position: '',
    shift: '',
    salary: null,
    startDate: ''
  };

  onSubmit() {
    console.log('Staff Data:', this.staff);
    // Thực hiện lưu dữ liệu nhân viên ở đây
  }

  onCancel() {
    // Reset form hoặc thực hiện hành động khác khi hủy
    this.staff = {
      staffCode: '',
      fullName: '',
      dob: '',
      gender: '',
      email: '',
      position: '',
      shift: '',
      salary: null,
      startDate: ''
    };
  }
}
