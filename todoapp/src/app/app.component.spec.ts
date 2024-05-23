import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ToDoComponent } from './ToDo/Components/to-do.component';
import ToDoState, { initializeState } from './ToDo/todo.state';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const initialState = initializeState();
  let store: MockStore<{ todos: ToDoState }>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ToDoComponent],
      providers: [provideMockStore({ initialState })],
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
