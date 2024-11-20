import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent implements OnInit {
  attendance = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    employeeCode: '',
    employeeName: '',
    days: {} as { [key: number]: boolean },
    workingDays: 0,
    totalWorkingDays: 0
  };

  daysInMonth: number[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeDaysInMonth();
  }

  initializeDaysInMonth() {
    const daysCount = new Date(this.attendance.year, this.attendance.month, 0).getDate();
    this.daysInMonth = Array.from({ length: daysCount }, (_, k) => k + 1);
    for (let day of this.daysInMonth) {
      if (!this.attendance.days[day]) {
        this.attendance.days[day] = false; // Khởi tạo tất cả các ngày là false (chưa chấm công)
      }
    }
  }

  getDayLabel(day: number): string {
    const date = new Date(this.attendance.year, this.attendance.month - 1, day);
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return `${daysOfWeek[date.getDay()]}(${day})`;
  }

  onSubmit() {
    this.attendance.workingDays = this.calculateWorkingDays();
    console.log('Attendance Data:', this.attendance);
    // Thực hiện lưu dữ liệu chấm công ở đây
    this.router.navigate(['/attendance-list']);
  }

  calculateWorkingDays(): number {
    return Object.values(this.attendance.days).filter(day => day).length;
  }

  onCancel() {
    this.router.navigate(['/attendance-list']);
  }
}
