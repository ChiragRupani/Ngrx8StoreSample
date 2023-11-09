import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ToDoComponent } from "./ToDo/Components/to-do.component";
import { ToDoEffects } from "./ToDo/todo.effects";
import { ToDoReducer } from "./ToDo/todo.reducer";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ todos: ToDoReducer }),
    EffectsModule.forRoot([ToDoEffects]),
    ToDoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
