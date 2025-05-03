import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { TodoChildComponent } from './todo-child.component';

describe('TodoChildComponent', () => {
  let component: TodoChildComponent;
  let fixture: ComponentFixture<TodoChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoChildComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit onCreateToDo if Title is empty or whitespace', () => {
    spyOn(component.onCreateToDo, 'emit');
    component.Title = '   ';
    component.createToDo();
    expect(component.onCreateToDo.emit).not.toHaveBeenCalled();
  });

  it('should emit onCreateToDo when valid todo is submitted', () => {
    spyOn(component.onCreateToDo, 'emit');

    const todoText = 'Prepare for interview';
    component.IsCompleted = true;
    component.Title = todoText + ' ';
    component.createToDo();

    expect(component.onCreateToDo.emit).toHaveBeenCalledWith({
      Title: todoText,
      IsCompleted: true,
    });

    expect(component.Title).toEqual('');
  });

  it('should emit onCreateToDo on form submit via the DOM', () => {
    spyOn(component.onCreateToDo, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;

    // Find the input element and update its value
    const inputElement = compiled.querySelector('input') as HTMLInputElement;
    inputElement.value = 'Apply for job';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // update the binding

    // Trigger the form submit event
    const formElement = compiled.querySelector('form') as HTMLFormElement;
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.onCreateToDo.emit).toHaveBeenCalledWith({
      Title: 'Apply for job',
      IsCompleted: false,
    });
  });
});
