import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoComponent } from './ToDo/Components/to-do.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToDoComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todoapp';
}
