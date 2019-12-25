import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoComponent } from './ToDo/Components/to-do.component';
import { ToDoEffects } from './ToDo/todo.effects';
import { ToDoReducer } from './ToDo/todo.reducer';

@NgModule({
  declarations: [AppComponent, ToDoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ todos: ToDoReducer }),
    EffectsModule.forRoot([ToDoEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
