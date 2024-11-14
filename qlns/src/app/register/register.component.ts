import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      taiKhoan: ['', Validators.required],
      matKhau: ['', Validators.required],
      nhapLaiMatKhau: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dienThoai: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('matKhau')!.value === form.get('nhapLaiMatKhau')!.value 
      ? null : { 'mismatch': true };
  }
}
