import { Component, OnInit } from '@angular/core';
import { ITask } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  tasks: ITask[] = [];

  constructor(private tasksService: TasksService) { }

  onChange(task: ITask): void{
    task.isDone = !task.isDone;
  }

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();
    console.log(this.tasks)
  }

}
