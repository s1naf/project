import { Component, inject, numberAttribute } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/interfaces/mongo-backend';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  userService = inject(UserService)


  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    age: new FormControl('18',[
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(18),
      Validators.max(100)
    ]),
    country: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.minLength(4)]),
    confirmpassword: new FormControl('',[Validators.required,Validators.minLength(4)])
  })
    
  onSubmit(value:any){

    console.log(value);

    this.form.reset( );

    const user:User = {
      username:this.form.get('username')?.value || '',
      firstname:this.form.get('firstname')?.value || '',
      lastname:this.form.get('lastname')?.value || '',
      email:this.form.get('email')?.value || '',
      password:this.form.get('password')?.value || '',
      country:this.form.get('country')?.value || '',
      city:this.form.get('city')?.value || '',
      age:this.form.get('age')?.value || ''
    }

    this.userService.registerUser(user).subscribe({
      next:(response) =>{
        console.log("success",response)
      },
      error:(response) =>{
        console.log("Can not pass the sumbit button.Error",response)
      }
    })
  }

}
