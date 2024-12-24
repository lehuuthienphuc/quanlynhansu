import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { PersonnelService, Person } from '../services/personnel.service';  // Nhập PersonnelService
=======
import { PersonnelService } from '../services/personnel.service';  // Nhập PersonnelService
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611

@Component({
  selector: 'app-personnel-details',
  templateUrl: './personnel-details.component.html',
  styleUrls: ['./personnel-details.component.css']
})
export class PersonnelDetailsComponent implements OnInit {
  employee: any;  // Biến để chứa thông tin nhân viên

  constructor(private router: Router, private personnelService: PersonnelService) {}
<<<<<<< HEAD
  ngOnInit(): void {
    // Gọi API để lấy thông tin chi tiết nhân viên
    this.personnelService.getAllPersons().subscribe(
      (data: Person[]) => {
=======

  ngOnInit(): void {
    // Gọi API để lấy thông tin chi tiết nhân viên
    this.personnelService.getEmployeeDetails(1).subscribe(
      (data: any) => {
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
        this.employee = data;  // Gán dữ liệu vào biến employee
      },
      (error: any) => {
        console.error('Lỗi khi lấy thông tin nhân viên:', error);  // Xử lý lỗi
      }
    );
  }

  // Phương thức điều hướng đến form chỉnh sửa
<<<<<<< HEAD
  onEdit(id: number): void {
    this.router.navigate(['/employee-management/personnel-form'], { state: { id: id } });
=======
  onEdit(): void {
    this.router.navigate(['/employee-management/personnel-form'], { state: { employee: this.employee } });
>>>>>>> cb5e124c38e7e96c2c591fcacc7d49de5cc80611
  }
}
