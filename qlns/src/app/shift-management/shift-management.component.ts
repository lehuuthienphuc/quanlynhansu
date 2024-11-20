import { Component } from '@angular/core';

@Component({
  selector: 'app-shift-management',
  templateUrl: './shift-management.component.html',
  styleUrls: ['./shift-management.component.css']
})
export class ShiftManagementComponent {
  shiftName: string = '';
  startTime: string = '';
  endTime: string = '';

  onSubmit() {
    // Logic xử lý khi người dùng lưu ca làm việc
    console.log('Tên ca làm việc:', this.shiftName);
    console.log('Thời gian bắt đầu:', this.startTime);
    console.log('Thời gian kết thúc:', this.endTime);
  }
}
