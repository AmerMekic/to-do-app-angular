import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { differenceInCalendarDays } from 'date-fns';
import { ITask } from '../task';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { TasksService } from '../tasks.service';

enum DateWarningSignEnum{
  Warning = 'warning',
  Danger = 'danger',
  Completed = 'completed',
  Expired = 'expired',
  Neutral = 'neutral'
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  faPen = faPenToSquare;
  @Input() task?: ITask;
  currentDate: Date = new Date();
  
  constructor(private router: Router, private tasksService: TasksService) {}

  @Output() addCompletedItem = new EventEmitter<ITask>();

  onChange(task: ITask): void{
    this.addCompletedItem.emit(task)
  }

  ngOnInit(): void {
  }

  public getCategoryBasedOnDeadline(date: Date , deadline: Date, task: ITask):DateWarningSignEnum {
    if(differenceInCalendarDays(deadline, date) < 16 && differenceInCalendarDays(deadline, date) > 7 && !task.isDone){
      task.category = 'warning';
      return DateWarningSignEnum.Warning;
    }
    else if(differenceInCalendarDays(deadline, date) < 8 && differenceInCalendarDays(deadline, date) > -1 && !task.isDone){
      task.category = 'danger';
      return DateWarningSignEnum.Danger
    }
    else if(differenceInCalendarDays(deadline, date) < 0 && !task.isDone){
      task.category = 'expired';
      return DateWarningSignEnum.Expired
    }
    else if(task.isDone){
      return DateWarningSignEnum.Completed
    }
    else{
      task.category = 'neutral'
      return DateWarningSignEnum.Neutral
    }
  }

  public goToEditTask(task: ITask):void {
    this.router.navigate(['/editTask/' + task._id])
  }

 

}
