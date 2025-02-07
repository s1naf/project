import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,AbstractControl, Form } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/interfaces/user-interface';
import { NgIf } from '@angular/common';
import { Router,RouterLink } from '@angular/router';



@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,NgIf,RouterLink],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  userService = inject(UserService)
  submissionSuccess: boolean = false;
  submissionError: boolean = false;
  router = inject(Router);
  errorMessage = '';

  form = new FormGroup({
    username: new FormControl('',Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    age: new FormControl(18,[
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(18),
      Validators.max(100)
    ]),
    password: new FormControl('',[Validators.required,Validators.minLength(4)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.minLength(4)])
  },this.passwordMatchValidator);
    
  passwordMatchValidator(control: AbstractControl):{[key:string]:boolean}|null{
    const form = control as FormGroup;
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    
    if(password && confirmPassword && password != confirmPassword){
      form.get('confirmPassword')?.setErrors({missMatch:true});
      return { missMatch:true};
    }
    return null;

  }

onSubmit() {
 
  const newUser: User = {
    username: this.form.get('username')?.value || '',
    firstname: this.form.get('firstname')?.value || '',
    lastname: this.form.get('lastname')?.value || '',
    email: this.form.get('email')?.value || '',
    password: this.form.get('password')?.value || '',
    age: this.form.get('age')?.value || 18
  };

  console.log("Submitting user:", newUser); // Log the user data

  this.userService.registerUser(newUser).subscribe({
    next: (response) => {
      console.log("Registration success", response);
      this.submissionSuccess = true;
      // this.form.reset();
      this.router.navigate(['/login']);
    },
    error: (response) => {
      console.log("Registration error", response);
      this.submissionError = true;
      this.errorMessage = response.error;

    }
  });

}
}