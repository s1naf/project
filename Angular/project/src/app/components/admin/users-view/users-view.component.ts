import { Component,inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { NgFor } from '@angular/common';
import { AdminView } from '../../../shared/interfaces/admin-view';
@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.css'
})
export class UsersViewComponent { 
  
  userService = inject(UserService);
  data:AdminView[] = [];
  errorMessage = "";

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next:(response)=>{
       this.data = response.data;
       console.log("Usernames",this.data)
      


        
      },
      error:(error)=>{
        console.log("Error",error)
      }
    });
    
  }

  changeRole(username:string,role:string,userRole:string){
    if(role !== userRole){
    this.userService.editRole(username,role).subscribe({
      next:(response)=>{
        const user = this.data.find(user => user.username === username);
        if(user){
          user.role = role;
        }
        console.log("Role updated",response.data)
      },
      error:(error)=>{
        console.log("Error",error)
      }
    })
  }else{
    this.errorMessage = "Role is already set to "+role
  }
  }

  
  deleteUser(username:string){
    this.userService.deleteUser(username).subscribe({
      next:(response)=>{
        this.data = this.data.filter(user => user.username !== username);

        console.log("User deleted",response.data)
      },
      error:(error)=>{
        console.log("Error",error)
      } 
    })
  }

}
