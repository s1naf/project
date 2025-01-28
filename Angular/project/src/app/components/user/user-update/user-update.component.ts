import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserView } from '../../../shared/interfaces/mongo-backend';
import * as bcrypt from 'bcryptjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {


userService = inject(UserService);
route = inject(ActivatedRoute);
router = inject(Router);
errorMessage: string | null = null;
updateMessage: string | null = null;
oldPassword: string = ''; 
paramSubscription: Subscription | undefined;
userUpdate:UserView | null = null;

updateUserForm = new FormGroup({
  username: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  firstname: new FormControl('', Validators.required),
  lastname: new FormControl('', Validators.required),
  password: new FormControl('',Validators.minLength(4)),
  newPassword: new FormControl('',Validators.minLength(4)),
  confirmPassword: new FormControl('',Validators.minLength(4))
});


ngOnInit(): void {
  this.loadUserData();

}

loadUserData(): void {
  const userId = this.userService.user()?.id;
  const paramUsername = this.route.snapshot.paramMap.get('username');
  const currentUsername = this.userService.user()?.username;

  if (userId && currentUsername === paramUsername) {
    this.userService.findOne().subscribe({
      next: (response) => {
          this.updateUserForm.patchValue({
            username: response.data.username,
            email: response.data.email,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            
          });
          this.oldPassword = response.data.password; 
          this.userUpdate ={
            username: response.data.username,
            email: response.data.email,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            password: response.data.password,
          };
    
      },
      error: (response) => {
        console.log("Error fetching user data", response);
        this.errorMessage = 'Error fetching user data';
        this.router.navigate([`/profile/${this.userService.user()?.username}`]);
      }});
  } else {
    this.errorMessage = 'User not logged in';
    this.router.navigate(['/login']);
  }
}
async onSubmit() {
  console.log("onSubmit called");

  const id = this.userService.user()?.id;
  if (!id) {
    console.log("User ID is undefined");
    return;
  }

  if (this.updateUserForm.valid) {
    console.log("Form is valid");

    const username = this.updateUserForm.get('username')?.value;
    const email = this.updateUserForm.get('email')?.value;
    const firstname = this.updateUserForm.get('firstname')?.value;
    const lastname = this.updateUserForm.get('lastname')?.value;
    const password = this.updateUserForm.get('password')?.value;
    const newPassword = this.updateUserForm.get('newPassword')?.value;
    const confirmPassword = this.updateUserForm.get('confirmPassword')?.value;

    console.log("Form values:", { username, email, firstname, lastname, password, newPassword, confirmPassword });

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      console.log("New password and confirm password do not match");
      this.updateMessage = 'New password and confirm password do not match.';
      return;
    }

    const updateData: any = {};
    if (username !== this.userUpdate?.username) updateData.username = username;
    if (email !== this.userUpdate?.email) updateData.email = email;
    if (firstname !== this.userUpdate?.firstname) updateData.firstname = firstname;
    if (lastname !== this.userUpdate?.lastname) updateData.lastname = lastname;

    if (password && newPassword) {
      const matchPassword = await bcrypt.compare(password, this.oldPassword);
      if (matchPassword) {
        updateData.newPassword = newPassword;
      } else {
        console.log("Password does not match");
        this.updateMessage = 'Password does not match.';
        return;
      }
    }

    console.log("Update data:", updateData);

    if (Object.keys(updateData).length > 0) {
      this.updateUser(id, updateData);
    } else {
      console.log("No changes detected");
      this.updateMessage = 'No changes detected.';
    }
  } else {
    console.log("Form is invalid");
  }
}



updateUser(id: string, updateData: any) {
  this.userService.updateUser(id, updateData).subscribe({
    next: (response) => {
        
        console.log("User update success", response);
        this.oldPassword = response.data.password;
        console.log("Old password", this.oldPassword);
        this.updateMessage = 'User updated successfully!';
        if(response.data.username){
        this.userService.updateUsername(response.data.username);
      }
        this.updateUserForm.patchValue({
          username: response.data.username,
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname
        });
        this.userUpdate = {
          username: response.data.username,
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          password: response.data.password
         };
        
        this.router.navigate([`/profile/${response.data.username}`]); // Redirect to the new URL with updated username
  
    },
    error: (response) => {
      console.log("Error updating user", response);

      this.updateMessage = 'Failed to update user. '+ response.error.data;
    }
  });
}

}


