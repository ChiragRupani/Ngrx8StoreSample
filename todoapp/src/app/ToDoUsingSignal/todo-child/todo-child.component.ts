import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import ToDo from '../../ToDo/todo.model';

@Component({
  selector: 'app-todo-child',
  imports: [FormsModule],
  templateUrl: './todo-child.component.html',
  styleUrl: './todo-child.component.scss',
})
export class TodoChildComponent {
  Title: string = '';
  IsCompleted: boolean = false;

  onCreateToDo = output<ToDo>();

  createToDo() {
    if (!this.Title?.trim()) {
      return;
    }

    this.onCreateToDo.emit({
      Title: this.Title.trim(),
      IsCompleted: this.IsCompleted,
    });
    this.Title = '';
    this.IsCompleted = false;
  }
}
