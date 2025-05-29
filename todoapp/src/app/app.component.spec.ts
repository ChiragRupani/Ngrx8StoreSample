import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { ToDoComponent } from './ToDo/Components/to-do.component';
import { initializeState } from './ToDo/todo.state';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const initialState = initializeState();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ToDoComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}), // Provide default or test-specific params
            },
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {});
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
