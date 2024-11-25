import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrls: ['./personnel-form.component.css']
})
export class PersonnelFormComponent {
  personnel = {
    personnelCode: '',
    fullName: '',
    dob: '',
    gender: '',
    email: '',
    position: '',
    shift: '',
    salary: null,
    startDate: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Personnel Data:', this.personnel);
    // Thực hiện lưu dữ liệu nhân viên ở đây
    this.router.navigate(['/personnel-list']);
  }

  onCancel() {
    this.router.navigate(['/personnel-list']);
  }
}