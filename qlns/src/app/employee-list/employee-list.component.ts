import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees = [
    { id: '001', name: 'Nguyễn Văn A', birthdate: '20/10/1999', gender: 'Nam', email: 'nguyenvana@gmail.com', position: 'NV', startDate: '01/3/2023' },
    { id: '002', name: 'Lê Thị B', birthdate: '18/1/1999', gender: 'Nữ', email: 'lethib@gmail.com', position: 'NV', startDate: '01/3/2023' },
    { id: '003', name: 'Phan Văn C', birthdate: '20/6/1999', gender: 'Nam', email: 'phanvanc@gmail.com', position: 'NV', startDate: '01/3/2023' },
    { id: '004', name: 'Lê Văn D', birthdate: '20/3/1999', gender: 'Nam', email: 'levand@gmail.com', position: 'NV', startDate: '01/3/2023' }
  ];
}
