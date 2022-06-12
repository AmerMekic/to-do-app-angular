import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';
import { ITask } from '../task';


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

  @Input() task?: ITask;
  currentDate: Date = new Date();
  constructor() {}

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

 

}
