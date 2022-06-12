import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskComponent } from './tasks/task/task.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'addtask', component: TaskFormComponent}
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
