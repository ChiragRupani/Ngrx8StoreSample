import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from './todo.action';
import ToDo from './todo.model';
import ToDoState, { initializeState } from './todo.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(ToDoActions.GetToDoAction, (state) => state),

  on(
    ToDoActions.CreateToDoAction,
    (state: ToDoState, todo: ToDo): ToDoState => {
      return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
    }
  ),

  on(
    ToDoActions.SuccessGetToDoAction,
    (state: ToDoState, { payload }): ToDoState => {
      return { ...state, ToDos: payload, ToDoError: null };
    }
  ),

  on(
    ToDoActions.SuccessCreateToDoAction,
    (state: ToDoState, { payload }): ToDoState => {
      return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
    }
  ),

  on(
    ToDoActions.ErrorToDoAction,
    (state: ToDoState, error: Error): ToDoState => {
      // remove below line and use different telemetry logging
      console.error(error);
      return { ...state, ToDoError: error };
    }
  )
);

export function ToDoReducer(
  state: ToDoState | undefined,
  action: Action
): ToDoState {
  return reducer(state, action);
}
