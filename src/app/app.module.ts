import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskComponent } from './tasks/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
