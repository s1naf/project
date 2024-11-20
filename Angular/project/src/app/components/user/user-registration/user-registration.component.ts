import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    age: new FormControl(18,[
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(18),
      Validators.max(100)
    ]),
    country: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.min(4)]),
    confirmpassword: new FormControl('',[Validators.required,Validators.min(40)])
  })
    
  onSubmit(value:any){
    console.log(value);
    this.form.reset( );
  }

}
