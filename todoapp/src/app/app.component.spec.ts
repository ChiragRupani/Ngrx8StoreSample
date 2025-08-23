import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { ToDoComponent } from './ToDo/Components/to-do.component';
import { initializeState } from './ToDo/todo.state';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const initialState = initializeState();
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ToDoComponent],
      providers: [
        provideZonelessChangeDetection(),
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
      inferTagName: true,
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
  });

  it('should create the app', async () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
