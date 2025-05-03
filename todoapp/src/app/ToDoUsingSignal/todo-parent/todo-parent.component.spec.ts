import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { ToDoHttpService } from '../../ToDo/todo.httpservice';
import ToDo from '../../ToDo/todo.model';
import { TodoParentComponent } from './todo-parent.component';

describe('TodoParentComponent', () => {
  let component: TodoParentComponent;
  let fixture: ComponentFixture<TodoParentComponent>;
  let todoServiceSpy: jasmine.SpyObj<ToDoHttpService>;

  const mockTodos: ToDo[] = [
    { Title: 'Test Todo 1', IsCompleted: false },
    { Title: 'Test Todo 2', IsCompleted: true },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ToDoHttpService', [
      'getToDos',
      'createToDos',
    ]);

    await TestBed.configureTestingModule({
      imports: [TodoParentComponent, FormsModule],
      providers: [
        { provide: ToDoHttpService, useValue: spy },
        provideAnimationsAsync(),
      ],
    })
      .compileComponents()
      .then(() => {
        todoServiceSpy = TestBed.inject(
          ToDoHttpService
        ) as jasmine.SpyObj<ToDoHttpService>;
      });

    fixture = TestBed.createComponent(TodoParentComponent);
    component = fixture.componentInstance;
    component.ToDoList.set([]);
    todoServiceSpy.getToDos.and.returnValue(of(mockTodos));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on initialization (ngOnInit)', () => {
    // Arrange: set up the spy to return our mock todos

    // Act: call ngOnInit which in turn calls loadTodos()
    component.ngOnInit();

    // Assert: the todos signal should now return the mock todos array
    expect(todoServiceSpy.getToDos).toHaveBeenCalled();
    expect(component.ToDoList()).toEqual(mockTodos);
  });

  it('should add a new todo and update the todos signal', () => {
    component.ToDoList.set([]);
    fixture.detectChanges();

    // Arrange: define a new todo title and what the service should return
    const newTitle = 'New Todo';
    const createdTodo: ToDo = { Title: newTitle, IsCompleted: true };
    todoServiceSpy.createToDos.and.returnValue(of(createdTodo));

    // Act: call the addTodo method
    component.createToDo(createdTodo);

    // Assert: verify service call, todos update, and input reset
    expect(todoServiceSpy.createToDos).toHaveBeenCalledWith(createdTodo);

    expect(component.ToDoList()).toEqual([createdTodo]);
  });

  it('should display todos in the component template', () => {
    // Arrange: set the todos signal with two sample items
    component.ToDoList.set(mockTodos);
    fixture.detectChanges();

    // Act: get the rendered list items from the template
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('.ToDoList');

    // Assert: the number and the text of the rendered todos match the mockTodos
    expect(listItems.length).toEqual(mockTodos.length);
    expect(listItems[0].textContent).toContain('Test Todo 1');
    expect(listItems[1].textContent).toContain('Test Todo 2');
  });
});
