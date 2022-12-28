import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable, of, throwError } from "rxjs";
import * as todoActions from "../todo.action";
import { ToDoEffects } from "../todo.effects";
import { ToDoHttpService } from "../todo.httpservice";
import ToDoState, { initializeState } from "../todo.state";
import { ToDoComponent } from "./to-do.component";

describe("ToDoComponent", () => {
  let todoComponent: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;

  const initialState = { todos: initializeState() };
  let store: MockStore<{ todos: ToDoState }>;
  let actions$: Observable<Action>;
  let todoServiceSpy: jasmine.SpyObj<ToDoHttpService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj("ToDoHttpService", ["getToDos"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [ToDoComponent],
      providers: [
        ToDoEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: ToDoHttpService, useValue: spy },
      ],
    })
      .compileComponents()
      .then(() => {
        store = TestBed.inject(MockStore);
        todoServiceSpy = TestBed.inject(
          ToDoHttpService
        ) as jasmine.SpyObj<ToDoHttpService>;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoComponent);
    todoComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("To Do component should be created", () => {
    expect(todoComponent).toBeTruthy();
  });

  it("To Do component should have new todos if store is updated", () => {
    store.setState({ todos: { ToDos: [], ToDoError: null } });
    store.refreshState();
    expect(todoComponent.ToDoList.length).toEqual(0);

    const todoList = [
      { Title: "First", IsCompleted: true },
      { Title: "Second", IsCompleted: false },
    ];

    let nextState: ToDoState = { ToDos: todoList, ToDoError: null };

    store.setState({ todos: nextState });
    store.refreshState();

    expect(todoComponent.ToDoList).toEqual(todoList);
    expect(todoComponent.todoError).toEqual(null);
  });

  it("Get ToDo Effects - loads data from API", () => {
    let nextState: ToDoState = {
      ToDos: [{ Title: "First", IsCompleted: true }],
      ToDoError: null,
    };
    store.setState({ todos: nextState });

    const source = hot("a", { a: todoActions.BeginGetToDoAction });
    const actions = new Actions(source);
    const payload = [{ Title: "second", IsCompleted: true }];
    todoServiceSpy.getToDos.and.returnValue(of(payload));

    const effects = new ToDoEffects(todoServiceSpy, actions);
    const expected = cold("b", {
      b: { type: todoActions.SuccessGetToDoAction.type, payload },
    });

    expect(effects.GetToDos$).toBeObservable(expected);
  });

  it("Get ToDo Effects - Handles errors", () => {
    const source = hot("a", { a: todoActions.BeginGetToDoAction });
    const testError = new Error("[To Do] - Test Error");
    todoServiceSpy.getToDos.and.returnValue(throwError(() => testError));

    const actions = new Actions(source);
    const effects = new ToDoEffects(todoServiceSpy, actions);
    const expected = cold("b", {
      b: { type: todoActions.ErrorToDoAction.type },
    });
    expect(effects.GetToDos$).toBeObservable(expected);
  });

  it("To Do component show latest todos", () => {
    const firstWish = { Title: "First Wish", IsCompleted: true };
    const secondWish = { Title: "Second Wish", IsCompleted: false };

    store.setState({
      todos: { ToDos: [firstWish, secondWish], ToDoError: null },
    });
    store.refreshState();

    fixture.detectChanges();
    const todoElement: HTMLElement = fixture.nativeElement;
    const elements = todoElement.querySelectorAll(".ToDoList");
    const todoItem1 = elements[0];
    const todoItem2 = elements[1];

    expect(todoItem1.textContent).toContain(firstWish.Title);
    expect(todoItem1.textContent).toContain(
      firstWish.IsCompleted ? "Yes" : "No"
    );

    expect(todoItem2.textContent).toContain(secondWish.Title);
    expect(todoItem2.textContent).toContain(
      secondWish.IsCompleted ? "Yes" : "No"
    );
  });

  it("To Do component show Error if there is error", () => {
    const firstWish = { Title: "First Wish", IsCompleted: true };

    store.setState({
      todos: { ToDos: [firstWish], ToDoError: new Error("Test Error") },
    });
    store.refreshState();

    fixture.detectChanges();
    const todoElement: HTMLElement = fixture.nativeElement;
    const todoItem1 = todoElement.querySelectorAll(".ToDoList")[0];
    const errorDiv = todoElement.querySelector("#ToDoError");

    expect(errorDiv.textContent.length).toBeGreaterThan(0);
    expect(todoItem1.textContent).toContain(firstWish.Title);
  });
});
