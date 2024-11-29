import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { PersonnelListComponent } from './personnel-list/personnel-list.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PersonnelDetailsComponent } from './personnel-details/personnel-details.component';
import { ShiftManagementComponent } from './shift-management/shift-management.component';
import { PersonnelFormComponent } from './personnel-form/personnel-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee-management', pathMatch: 'full' },

  {
    path: 'employee-management', component: EmployeeManagementComponent, children: [
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'personnel-details', component: PersonnelDetailsComponent }, // Đường dẫn đến form Thông Tin Nhân Viên
      { path: 'personnel-form', component: PersonnelFormComponent },  // Thêm route cho form chỉnh sửa
      { path: 'shift-management', component: ShiftManagementComponent },
      { path: 'add-employee', component: StaffFormComponent},
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'staff-form', component: StaffFormComponent },
  { path: 'attendance-form', component: AttendanceFormComponent },
  { path: 'attendance-list', component: AttendanceListComponent },
  { path: 'personnel-list', component: PersonnelListComponent },
  { path: 'payroll-list', component: PayrollListComponent },

  { path: '**', redirectTo: '/employee-management/employee-list' } // Đường dẫn mặc định nếu không tìm thấy
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
