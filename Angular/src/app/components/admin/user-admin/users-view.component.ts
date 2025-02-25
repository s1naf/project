import { Component,inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { NgFor } from '@angular/common';
import { AdminView } from '../../../shared/interfaces/admin-view';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.css'
})
export class UsersViewComponent { 
  
  userService = inject(UserService);
  router = inject(Router);
  adminUser:AdminView[] = [];
  errorMessage = "";

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next:(response)=>{
       this.adminUser = response.data;
       console.log("Usernames",this.adminUser)
      },
      error:(error)=>{
        console.log("Error",error)
      }
    });
    
  }

  changeRole(username:string,role:string,userRole:string){
    const currentUser = this.userService.user();
    
    if (role !== userRole) {
      this.userService.editRole(username, role).subscribe({
        next: (response) => {
          role = response.data.role;
          if (currentUser?.username === username) {
            this.userService.updateRole(role);
          }
          const newAdminUserList = this.adminUser.map(user => {
            if (user.username === username) {
              user.role = role;
            }
            return user;
          });
          
          this.adminUser = newAdminUserList;
          
          this.errorMessage = "Role updated to " + role;
          
          if (username === this.userService.user()?.username && role !== 'admin') {
            this.router.navigate(['/home']);
          }

        },

        error: (error) => {
          console.log("Error", error);
        }
      });
    } else {
      this.errorMessage = "Role is already set to " + role;
    }
  }
  

  
  deleteUser(username:string){
    this.userService.deleteUser(username).subscribe({
      next:(response)=>{
        this.adminUser = this.adminUser.filter(user => user.username !== username);
        console.log("User deleted",response.data)
      },
      error:(error)=>{
        console.log("Error",error)
      } 
    })
  }

}
