import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonnelService, Person } from '../services/personnel.service';  // Nhập PersonnelService

@Component({
  selector: 'app-personnel-details',
  templateUrl: './personnel-details.component.html',
  styleUrls: ['./personnel-details.component.css']
})
export class PersonnelDetailsComponent implements OnInit {
  employee: any;  // Biến để chứa thông tin nhân viên

  constructor(private router: Router, private personnelService: PersonnelService) {}
  ngOnInit(): void {
    // Gọi API để lấy thông tin chi tiết nhân viên
    this.personnelService.getAllPersons().subscribe(
      (data: Person[]) => {
        this.employee = data;  // Gán dữ liệu vào biến employee
      },
      (error: any) => {
        console.error('Lỗi khi lấy thông tin nhân viên:', error);  // Xử lý lỗi
      }
    );
  }

  // Phương thức điều hướng đến form chỉnh sửa
  onEdit(id: number): void {
    this.router.navigate(['/employee-management/personnel-form'], { state: { id: id } });
  }
}
