import { Component } from '@angular/core';

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.css']
})
export class PayrollListComponent {
  payrolls = [
    {
      id: '01',
      name: 'Nguyễn Văn A',
      workDays: 26,
      leaveDays: 0,
      sundays: 0,
      overtime: 0,
      bonus: '3tr5',
      allowance: '3tr',
      advanceSalary: 0,
      netSalary: '6tr5'
    },
    {
      id: '02',
      name: 'Lê Thị B',
      workDays: 26,
      leaveDays: 3,
      sundays: 0,
      overtime: '600.000',
      bonus: '7tr150',
      allowance: 0,
      advanceSalary: 0,
      netSalary: '7tr750'
    }
  ];
}
