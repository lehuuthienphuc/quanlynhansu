import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.css']
})
export class PersonnelListComponent {
  personnelList = [
    { id: 1, fullName: 'Nguyen Van A' },
    { id: 2, fullName: 'Le Thi B' },
    // Thêm các nhân viên khác nếu có
  ];

  constructor(private router: Router) {}

  showPersonnelForm() {
    this.router.navigate(['/personnel-form']);
  }
}