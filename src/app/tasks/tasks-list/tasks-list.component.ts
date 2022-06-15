import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { isAfter, isBefore } from 'date-fns';
import { Subscription } from 'rxjs';
import { ITask } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {

  tasks: ITask[] = [];  
  sub!: Subscription;
  completedTasks: ITask[] = [];
  sortValue: string[] = ['deadline date(asc)', 'deadline date(desc)', 'created date(asc)', 'created date(desc)', 'title(asc)', 'title(desc)', 'user(asc)', 'user(desc)']
  startSortValue: string = 'deadline date(asc)'
  constructor(private tasksService: TasksService) { }

  onChange(task: ITask): void{
    task.isDone = !task.isDone;
    this.tasksService.editTaskCompletion(task);
    
  }

  sortTasks(value: string){
    this.startSortValue = value;

    if(value === 'deadline date(asc)'){
      this.tasks.sort((x: ITask,y: ITask) => {
        if(isBefore(x.deadlineDate.toDate(), y.deadlineDate.toDate())){
          return -1;
        }
        else if(isAfter(x.deadlineDate.toDate(), y.deadlineDate.toDate())){
          return 1
        }
        else{
          return 0
        }
      })

    }
    else if(value === 'deadline date(desc)'){
      this.tasks.sort((x: ITask,y: ITask) => {
        if(isBefore(x.deadlineDate.toDate(), y.deadlineDate.toDate())){
          return 1;
        }
        else if(isAfter(x.deadlineDate.toDate(), y.deadlineDate.toDate())){
          return -1
        }
        else{
          return 0
        }
      })
    }

    else if(value === 'created date(asc)'){
      this.tasks.sort((x: ITask,y: ITask) => {
        if(isBefore(x.addedDate.toDate(), y.addedDate.toDate())){
          return -1;
        }
        else if(isAfter(x.addedDate.toDate(), y.addedDate.toDate())){
          return 1
        }
        else{
          return 0
        }
      })
    }
    else if(value === 'created date(desc)'){
      this.tasks.sort((x: ITask,y: ITask) => {
        if(isBefore(x.addedDate.toDate(), y.addedDate.toDate())){
          return 1;
        }
        else if(isAfter(x.addedDate.toDate(), y.addedDate.toDate())){
          return -1
        }
        else{
          return 0
        }
      })
    }
    else if(value === 'title(asc)'){
      this.tasks.sort((x: ITask,y: ITask) => {
        if(x.title < y.title){
          return 1;
        }
        else if(x.title > y.title){
          return -1
        }
        else{
          return 0
        }
      })
    }
    else if(value === 'title(desc)'){
      this.tasks.sort((x: ITask,y: ITask) => {
        if(x.title < y.title){
          return -1;
        }
        else if(x.title > y.title){
          return 1
        }
        else{
          return 0
        }
      })
    }
    else if(value === 'user(asc)'){
      this.tasks.sort((x: ITask,y: ITask) => {
        if(x.user < y.user){
          return 1;
        }
        else if(x.user > y.user){
          return -1
        }
        else{
          return 0
        }
      })
    }
    else if(value === 'user(desc)'){
      this.tasks.sort((x: ITask,y: ITask) => {
        if(x.user < y.user){
          return -1;
        }
        else if(x.user > y.user){
          return 1
        }
        else{
          return 0
        }
      })
    }
  }

  ngOnInit(): void {
   this.sub = this.tasksService.getTasks().subscribe((res: ITask[]) => {
    this.tasks = res.filter(value => value.isDone === false);
    this.completedTasks = res.filter(value => value.isDone === true);
    this.sortTasks(this.startSortValue);
  });
   
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe;
  }

}
