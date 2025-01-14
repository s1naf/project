import { Component ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../shared/services/user-post.service';
import { Post } from '../../shared/interfaces/post';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {

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