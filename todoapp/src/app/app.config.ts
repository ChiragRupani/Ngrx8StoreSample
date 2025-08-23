import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ToDoEffects } from './ToDo/todo.effects';
import { ToDoReducer } from './ToDo/todo.reducer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({ todos: ToDoReducer }),
    provideEffects([ToDoEffects]),
    provideBrowserGlobalErrorListeners(),
  ],
};
