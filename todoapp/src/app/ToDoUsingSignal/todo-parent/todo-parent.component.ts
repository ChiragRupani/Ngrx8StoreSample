import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoHttpService } from '../../ToDo/todo.httpservice';
import ToDo from '../../ToDo/todo.model';
import { TodoChildComponent } from '../todo-child/todo-child.component';

@Component({
  selector: 'app-todo-parent',
  imports: [FormsModule, TodoChildComponent],
  templateUrl: './todo-parent.component.html',
  styleUrl: './todo-parent.component.scss',
  animations: [
    trigger('todoAnimation', [
      // The ':enter' alias matches the insertion of a new element into the DOM.
      transition(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          animate(
            '{{duration}}ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ],
        { params: { duration: 300 } }
      ),
    ]),
  ],
})
export class TodoParentComponent implements OnInit {
  ToDoList = signal<ToDo[]>([]);

  toDoService = inject(ToDoHttpService);

  todoError = signal<Error>(null);

  animateNewItems = false;

  ngOnInit(): void {
    this.loadToDo();
  }

  createToDo(todo: ToDo) {
    this.toDoService.createToDos(todo).subscribe({
      next: (createdToDo) => {
        this.ToDoList.update((current) => [...current, createdToDo]);
        this.animateNewItems = true;
      },
      error: (error) => {
        console.error('Error adding ToDo: ', error);
        this.todoError.set(error);
      },
    });
  }

  loadToDo() {
    this.toDoService.getToDos().subscribe({
      next: (ToDos) => this.ToDoList.set(ToDos),
      error: (error) => {
        console.error('Error loading ToDos: ', error);
        this.todoError.set(error);
      },
    });
  }
}
