import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { PersonnelListComponent } from './personnel-list/personnel-list.component';
import { PersonnelDetailsComponent } from './personnel-details/personnel-details.component';
import { PersonnelFormComponent } from './personnel-form/personnel-form.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeePerformanceComponent } from './employee-performance/employee-performance.component';
import { ShiftManagementComponent } from './shift-management/shift-management.component';
import { WorkShiftAssignmentComponent } from './work-shift-assignment/work-shift-assignment.component';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeManagementComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    StaffFormComponent,
    PersonnelListComponent,
    PersonnelDetailsComponent,
    PersonnelFormComponent,
    AttendanceListComponent,
    AttendanceFormComponent,
    EmployeeListComponent,
    EmployeePerformanceComponent,
    ShiftManagementComponent,
    WorkShiftAssignmentComponent,
    ShiftListComponent,
    PayrollListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
