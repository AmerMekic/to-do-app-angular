import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskComponent } from './tasks/task/task.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortComponent } from './shared/sort/sort.component';
import { FilterComponent } from './shared/filter/filter.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskComponent,
    TaskFormComponent,
    TaskEditComponent,
    SortComponent,
    FilterComponent,
    CalendarComponent
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: TasksListComponent}, 
      {path: 'addtask', component: TaskFormComponent},
      {path: 'editTask/:id', component: TaskEditComponent},
      {path: 'calendar', component: CalendarComponent}
    ], {onSameUrlNavigation: 'reload'}),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
