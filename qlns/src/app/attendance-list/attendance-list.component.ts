import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Attendance {
  employeeCode: string;
  employeeName: string;
  workingDays: number;
  leaveDays: number;
  sundays: number;
  overtime: number;
  rewardDays: number;
  allowances: number;
  advanceSalary: number;
  totalSalary: number;
}

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent {
  attendances: Attendance[] = [
    // Dữ liệu mẫu
    {
      employeeCode: 'NV001',
      employeeName: 'Nguyen Van A',
      workingDays: 20,
      leaveDays: 2,
      sundays: 4,
      overtime: 5,
      rewardDays: 1,
      allowances: 1000000,
      advanceSalary: 2000000,
      totalSalary: 15000000
    },
    // Thêm các bản ghi khác nếu cần
  ];

  constructor(private router: Router) {}

  addAttendance() {
    this.router.navigate(['/attendance-form']);
  }
}
