import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { RegisterComponent } from './register/register.component'; // Import the Register component

const routes: Routes = [
  { path: '', component: EmployeeManagementComponent }, // Default route for Employee Management
  { path: 'login', component: LoginComponent },          // Login route
  { path: 'register', component: RegisterComponent },    // Register route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
