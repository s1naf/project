import { Component } from '@angular/core';
import { MenuList } from '../../shared/interfaces/menu-list';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  // menu:MenuList[] =[
  //   // {text:}
  // ]
}
