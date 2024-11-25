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
import { EmployeeListComponent } from './employee-list/employee-list.component'; // Thêm
import { PersonnelDetailsComponent } from './personnel-details/personnel-details.component'; // Thêm
import { ShiftManagementComponent } from './shift-management/shift-management.component'; // Thêm

const routes: Routes = [
  { path: '', redirectTo: '/employee-management', pathMatch: 'full' },
  { path: 'employee-management', component: EmployeeManagementComponent, children: [ // Thêm "children" cho các trang con
    { path: 'employee-list', component: EmployeeListComponent },
    { path: 'personnel-details', component: PersonnelDetailsComponent },
    { path: 'shift-management', component: ShiftManagementComponent }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'staff-form', component: StaffFormComponent },
  { path: 'attendance-form', component: AttendanceFormComponent },
  { path: 'attendance-list', component: AttendanceListComponent },
  { path: 'personnel-list', component: PersonnelListComponent },
  { path: 'payroll-list', component: PayrollListComponent },
  { path: '**', redirectTo: '/employee-management' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
