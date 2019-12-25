import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { ToDoComponent } from './ToDo/Components/to-do.component';
import ToDoState, { initializeState } from './ToDo/todo.state';

describe('AppComponent', () => {
  const initialState = initializeState();
  let store: MockStore<{ todos: ToDoState }>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [AppComponent, ToDoComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents()
      .then(() => {
        store = TestBed.get<Store<{ todos: ToDoState }>>(Store);
      });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
