import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = []; // Danh sách nhân viên gốc từ API
  filteredEmployees: Employee[] = []; // Danh sách nhân viên sau khi lọc
  selectedEmployeeIds: Set<number> = new Set(); // Tập hợp ID nhân viên được chọn
  isLoading: boolean = false; // Trạng thái tải dữ liệu
  errorMessage: string | null = null; // Thông báo lỗi (nếu có)
  searchTerm: string = ''; // Biến lưu giá trị tìm kiếm

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  // Lấy danh sách nhân viên từ API
  fetchEmployees(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees]; // Khởi tạo danh sách lọc
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees', err);
        this.isLoading = false;
        this.errorMessage = 'Không thể tải danh sách nhân viên. Vui lòng thử lại sau.';
      },
    });
  }

  // Lọc danh sách nhân viên theo từ khóa tìm kiếm
  onSearch(): void {
    const searchTermLower = this.searchTerm.trim().toLowerCase(); // Chuyển từ khóa tìm kiếm về chữ thường
    if (!searchTermLower) {
      this.filteredEmployees = [...this.employees]; // Nếu không có từ khóa, hiển thị toàn bộ danh sách
    } else {
      this.filteredEmployees = this.employees.filter(
        (employee) =>
          employee.hoTen.toLowerCase().includes(searchTermLower) || // Tìm theo họ và tên
          employee.maNhanVien.toString().toLowerCase().includes(searchTermLower) // Tìm theo mã nhân viên
      );
    }
  }

  // Thay đổi trạng thái chọn/deselect nhân viên
  toggleSelection(employeeId: number): void {
    if (this.selectedEmployeeIds.has(employeeId)) {
      this.selectedEmployeeIds.delete(employeeId);
    } else {
      this.selectedEmployeeIds.add(employeeId);
    }
  }

  // Xóa các nhân viên được chọn
  deleteSelectedEmployees(): void {
    if (this.selectedEmployeeIds.size === 0) {
      alert('Vui lòng chọn ít nhất một nhân viên để xóa.');
      return;
    }
  
    if (!confirm('Bạn có chắc chắn muốn xóa các nhân viên đã chọn?')) {
      return;
    }
  
    this.isLoading = true;
    const idsToDelete = Array.from(this.selectedEmployeeIds);
  
    this.employeeService.batchDeleteEmployees(idsToDelete).subscribe({
      next: (response) => {
        if (response.success) {
          // Cập nhật danh sách sau khi xóa thành công
          this.loadEmployees(); // Tải lại toàn bộ danh sách từ server
          this.selectedEmployeeIds.clear();
          alert(response.message || 'Đã xóa nhân viên thành công.');
        } else {
          alert('Không thể xóa nhân viên. Vui lòng thử lại.');
        }
      },
      error: (err) => {
        console.error('Lỗi khi xóa nhân viên:', err);
        let errorMessage = 'Đã xảy ra lỗi khi xóa nhân viên. Vui lòng thử lại sau.';
        if (err.status === 400) {
          errorMessage = 'Yêu cầu không hợp lệ. Vui lòng kiểm tra dữ liệu đầu vào.';
        } else if (err.status === 404) {
          errorMessage = 'Không tìm thấy nhân viên. Có thể nhân viên đã bị xóa.';
        }
        alert(errorMessage);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  // Thêm method loadEmployees để tải lại dữ liệu
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = [...data];
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách nhân viên:', err);
        alert('Không thể tải danh sách nhân viên. Vui lòng thử lại sau.');
      }
    });
  }
  

  // Kiểm tra trạng thái chọn của nhân viên
  isSelected(employeeId: number): boolean {
    return this.selectedEmployeeIds.has(employeeId);
  }
}
