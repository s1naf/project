import { Component ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../shared/services/user-post.service';
import { Post } from '../../shared/interfaces/post';
@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

usePostService = inject(PostService)
router = inject(Router)

postForm = new FormGroup({
  post: new FormControl('', Validators.required),
})


onSubmit(value:any){
  if(this.postForm.valid){
    const post:Post = {
      post:this.postForm.get('post')?.value || '',
    };
    console.log("Post",post);
    this.usePostService.registerPost(post).subscribe({
      next:(response) =>{
        console.log("success",response)
        this.postForm.reset( );
        
        this.router.navigate(['/home'])
      },
      error:(error) =>{
        console.log("error",error)
      }
    })
  }else{
    console.log("Invalid form")
  }

}
}