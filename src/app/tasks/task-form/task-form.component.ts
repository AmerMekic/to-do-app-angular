import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { differenceInCalendarDays } from 'date-fns';
import { ITask } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit{
  deadline!: string;
  task: ITask = {
    title: '',
    description: '',
    addedDate: Timestamp.fromDate(new Date()),
    deadlineDate: new Timestamp(0,0),
    isDone: false,
    user: '',
    category: ''
    };
    
  constructor(private tasksService: TasksService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public getCategoryBasedOnDeadline(deadline: Date , date: Date):string {
    if(differenceInCalendarDays(deadline, date) < 16 && differenceInCalendarDays(deadline, date) > 7){
      return 'warning';
    }
    else if(differenceInCalendarDays(deadline, date) < 8 && differenceInCalendarDays(deadline, date) > -1){
      return 'danger'
    }
    else if(differenceInCalendarDays(deadline, date) < 0){
      return 'expired'
    }
    else{
      return 'neutral'
    }
  }
  
  onSubmit(form: NgForm): void{
    this.task.deadlineDate = Timestamp.fromDate(new Date(this.deadline));
    if(form.valid){
      this.task.category = this.getCategoryBasedOnDeadline(this.task.deadlineDate.toDate(), this.task.addedDate.toDate())    
      this.tasksService.addTask(this.task);
      this.router.navigate(['/']);
    }
  }
}
