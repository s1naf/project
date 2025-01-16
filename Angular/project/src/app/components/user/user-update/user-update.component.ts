import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserView } from '../../../shared/interfaces/mongo-backend';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {

  userService = inject(UserService);
  usernameExists: boolean = false;
  emailExists: boolean = false;
  updateMessage: string = '';
  errorMessage: string = '';
  router = inject(Router);
  viewCredentials:UserView = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    age: 18};
    updateUserForm = new FormGroup({
        username: new FormControl(''),
        email: new FormControl('', Validators.email),
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        password: new FormControl('')
    });

  route = inject(ActivatedRoute);  


ngOnInit(): void {
  const userId = this.userService.user()?.id;
  const paramUsername = this.route.snapshot.paramMap.get('username');
  const currentUsername = this.userService.user()?.username;

  if (userId && currentUsername === paramUsername) {
    this.userService.findOne().subscribe({
      next: (response) => {
        console.log(response.data);        
        this.updateUserForm.patchValue({
          username: response.data.username,
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          password: ''
        });  
      },
      error: (response) => {
       
      }
    });
  } else {
    this.errorMessage = 'Unauthorized access';
    this.router.navigate([`/profile/${currentUsername}`]);
  }
}

onSubmit() {
  if (this.updateUserForm.valid) {
    const username = this.updateUserForm.get('username')?.value;
    const email = this.updateUserForm.get('email')?.value;
    const firstname = this.updateUserForm.get('firstname')?.value;
    const lastname = this.updateUserForm.get('lastname')?.value;
    const password = this.updateUserForm.get('password')?.value;
    const userId = this.userService.user()?.id;

    if (userId) {
      this.updateUser(userId, { username, email, firstname, lastname, password });
    }
  } else {
    console.log("Form is invalid");
  }
}

updateUser(userId: string, updateData: any) {
  this.userService.updateUser(userId, updateData).subscribe({
    next: (response) => {
      if (response.data) {
        console.log("User update success", response);
        this.updateMessage = 'User updated successfully!';
        this.userService.user.set({ ...this.userService.user()!, ...updateData });
      } else {
        console.log("Failed to update user", response);
        this.updateMessage = 'Failed to update user.';
      }
    },
    error: (response) => {
      console.log("Error updating user", response);
      this.updateMessage = 'Failed to update user.';
    }
  });
}
}