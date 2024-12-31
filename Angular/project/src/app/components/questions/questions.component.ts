import { Component ,inject} from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ChoicesService } from '../../shared/services/user-choices.service';
import { Choices } from '../../shared/interfaces/choices';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {

useQuestionrService = inject(ChoicesService)

choicesForm = new FormGroup({
  question: new FormControl('',Validators.required),
  answer: new FormControl('', Validators.required),
})


onSubmit(value:any){
  if(this.choicesForm.valid){
    const choices:Choices = {
      question:this.choicesForm.get('question')?.value || '',
      answer:this.choicesForm.get('answer')?.value || '',
    };
    console.log("Choices",choices);
    this.useQuestionrService.registerChoices(choices).subscribe({
      next:(response) =>{
        console.log("success",response)
        this.choicesForm.reset( );

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