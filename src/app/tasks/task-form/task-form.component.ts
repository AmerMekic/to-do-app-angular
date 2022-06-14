import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ITask } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
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

  onSubmit(form: NgForm): void{
    this.task.deadlineDate = Timestamp.fromDate(new Date(this.deadline));
    if(form.valid){
      this.tasksService.addTask(this.task);
      this.router.navigate(['/']);
    }
  }
}
