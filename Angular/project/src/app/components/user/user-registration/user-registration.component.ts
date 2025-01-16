import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,AbstractControl, Form } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/interfaces/mongo-backend';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,NgIf],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  userService = inject(UserService)
  usernameExists: boolean = false;
  emailExists: boolean = false;

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
  if (this.form.valid) {
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')?.value;
    if (username && email) {
      this.checkUsername(username, email);
    } else {
      console.log("Username or email is invalid");
    }
  } else {
    console.log("Form is invalid");
  }
}

checkUsername(username: string, email: string) {
  this.userService.checkUsername(username).subscribe({
    next: (response) => {
      console.log("Username check success", response);
      if(response.data){
        this.usernameExists = true;
      this.checkEmail(email);
      }else{
        this.usernameExists = false;
        console.log("Username already exists");
      }
    },
    error: (response) => {
      console.log("Error username exists", response);
    }
  });
}

checkEmail(email: string) {
  this.userService.checkEmail(email).subscribe({
    next: (response) => {
      console.log("Email check success", response);
      if(response.data){
        this.emailExists = true;
        this.registerUser();
      }else{
        this.emailExists = false;
        console.log("Email already exists");
      }
    },
    error: (response) => {
      console.log("Error email exists", response);
    }
  });
}

registerUser() {
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
      this.form.reset();
    },
    error: (response) => {
      console.log("Registration error", response);
    }
  });
}


}