import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCrud } from './user-crud/user-crud';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserCrud],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
