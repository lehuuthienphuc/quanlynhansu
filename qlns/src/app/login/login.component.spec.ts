import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule]  // Đảm bảo đã import ReactiveFormsModule
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with empty values', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.controls['taiKhoan'].value).toBe('');
    expect(component.loginForm.controls['matKhau'].value).toBe('');
  });

  it('should make the form invalid when fields are empty', () => {
    component.loginForm.controls['taiKhoan'].setValue('');
    component.loginForm.controls['matKhau'].setValue('');
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should make the form valid when both fields are filled', () => {
    component.loginForm.controls['taiKhoan'].setValue('testUser');
    component.loginForm.controls['matKhau'].setValue('password123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call onSubmit method when form is submitted', () => {
    spyOn(component, 'onSubmit');  // Giả lập gọi phương thức onSubmit
    component.loginForm.controls['taiKhoan'].setValue('testUser');
    component.loginForm.controls['matKhau'].setValue('password123');
    
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.onSubmit).toHaveBeenCalled();
  });
});