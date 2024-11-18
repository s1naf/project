import { Component } from '@angular/core';
import { BodyComponent } from '../../../style/body/body.component';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
