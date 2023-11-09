import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as ToDoActions from "../todo.action";
import ToDo from "../todo.model";
import ToDoState from "../todo.state";

@Component({
  selector: "app-to-do",
  templateUrl: "./to-do.component.html",
  styleUrls: ["./to-do.component.scss"],
  standalone: true,
  imports: [FormsModule],
})
export class ToDoComponent implements OnInit {
  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select("todos"));
  }

  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map((x) => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];

  Title: string = "";
  IsCompleted: boolean = false;

  todoError: Error = null;

  createToDo() {
    const todo: ToDo = { Title: this.Title, IsCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.Title = "";
    this.IsCompleted = false;
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
