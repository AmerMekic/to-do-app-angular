import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { catchError, of, tap, timestamp } from 'rxjs';
import { ITask } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  testTime!: Timestamp;
  tasks: ITask[] = [];  
  completedTasks: ITask[] = [];
  
  constructor(private tasksService: TasksService) { }

  onChange(task: ITask): void{
    task.isDone = !task.isDone;
    
    if(this.completedTasks.includes(task)){
      this.completedTasks = this.completedTasks.filter(value => value._id !== task._id)
    }
    else{
      this.completedTasks.push(task)
    }
    
  }

  ngOnInit(): void {
   this.tasksService.getTasks().subscribe((res: ITask[]) => {
    this.tasks = res;
   });
  }

}
