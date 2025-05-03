import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ToDoNgrxStore',
    loadComponent: () =>
      import('./ToDo/Components/to-do.component').then((m) => m.ToDoComponent),
  },
  {
    path: 'ToDoSignal',
    loadComponent: () =>
      import('./ToDoUsingSignal/todo-parent/todo-parent.component').then(
        (m) => m.TodoParentComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./ToDo/Components/to-do.component').then((m) => m.ToDoComponent),
  },
];
