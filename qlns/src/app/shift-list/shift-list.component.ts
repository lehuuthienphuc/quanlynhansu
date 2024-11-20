import { Component } from '@angular/core';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent {
  shifts = [
    { id: '01', name: 'Ca 1', start: '8:00', end: '16:00' },
    { id: '02', name: 'Ca 2', start: '16:00', end: '22:00' },
  ];

  editShift(shift: any) {
    alert(`Sửa ca làm việc: ${shift.name}`);
  }

  deleteShift(shift: any) {
    const confirmDelete = confirm(`Xóa ca làm việc: ${shift.name}?`);
    if (confirmDelete) {
      this.shifts = this.shifts.filter(s => s !== shift);
    }
  }
}
