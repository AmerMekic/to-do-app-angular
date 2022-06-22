import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  task!: ITask;
  deadline!: string;
  id: string | null = this.route.snapshot.paramMap.get('id');
  constructor(public taskService: TasksService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.id !== null){
      this.taskService.getTaskByID(this.id).subscribe((res: ITask) => this.task = res);
    }
  }

  isValid(): boolean{
    if(this.task.description.length === 0 || this.task.title.length === 0 || this.task.user.length === 0){
      return false;
    }
    else{
      return true;
    }
  }

  onComplete():void {
    if(this.task != undefined){
      if(this.deadline){
        this.task.deadlineDate = Timestamp.fromDate(new Date(this.deadline))
      }
      if(this.isValid()){
        this.taskService.editTask(this.task);
      }
    }
  }

  onRemove():void {
    if(this.id != null){
      this.taskService.removeTask(this.id);
    }
  }

}
