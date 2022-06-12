import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ITask } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  task: ITask = {
    title: '',
    description: '',
    addedDate: Timestamp.fromDate(new Date()),
    deadlineDate: new Timestamp(222,123123),
    isDone: false,
    user: '',
    category: ''
    };
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void{
    this.task.deadlineDate = Timestamp.fromDate(new Date(form.value.date));
    this.tasksService.addTask(this.task)
    .then(() => form.reset); 
  }
}
