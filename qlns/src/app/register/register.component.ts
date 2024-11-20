import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      taiKhoan: ['', [Validators.required, Validators.minLength(4)]],
      matKhau: ['', [Validators.required, Validators.minLength(6)]],
      nhapLaiMatKhau: ['', Validators.required],
      hoTen: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dienThoai: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      ngaySinh: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
      // Add logic to send data to the server
      this.router.navigate(['/login']);  // Navigate to login page after successful registration
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('matKhau')!.value === form.get('nhapLaiMatKhau')!.value 
      ? null : { 'mismatch': true };
  }

  onBack() {
    this.router.navigate(['/login']); // Navigate back to login page
  }
}