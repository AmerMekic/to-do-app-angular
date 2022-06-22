import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isAfter, isBefore } from 'date-fns';
import { Subscription } from 'rxjs';
import { ITask } from '../task';
import { TasksService } from '../tasks.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  sub!: Subscription;
  completedTasks: ITask[] = [];
  sortValue: string[] = ['deadline date(asc)', 'deadline date(desc)', 'created date(asc)', 'created date(desc)', 'title(asc)', 'title(desc)', 'user(asc)', 'user(desc)']
  startSortValue: string = 'deadline date(asc)';
  constructor(private tasksService: TasksService, private route: ActivatedRoute) {}
  
  onChange(task: ITask): void{

    task.isDone = !task.isDone;
    this.tasksService.editTaskCompletion(task);

  }

  sortTasks(value: string){
    this.startSortValue = value;

    if(value === 'deadline date(asc)'){
      this.filteredTasks.sort((x: ITask,y: ITask) => {
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
      this.filteredTasks.sort((x: ITask,y: ITask) => {
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
      this.filteredTasks.sort((x: ITask,y: ITask) => {
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
      this.filteredTasks.sort((x: ITask,y: ITask) => {
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
      this.filteredTasks.sort((x: ITask,y: ITask) => {
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
      this.filteredTasks.sort((x: ITask,y: ITask) => {
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
      this.filteredTasks.sort((x: ITask,y: ITask) => {
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
      this.filteredTasks.sort((x: ITask,y: ITask) => {
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

  onFilter(filterValue: string[]):void{
    if(filterValue.length === 0){
      this.filteredTasks = [...this.tasks]
      this.sortTasks(this.startSortValue);
    }
    else{
      this.filteredTasks = this.tasks.filter(value => filterValue.includes(value.category))
      this.sortTasks(this.startSortValue);
    }
  }

  ngOnInit(): void {
   this.sub = this.tasksService.getTasks().subscribe((res: ITask[]) => {

    this.tasks = res;
    this.filteredTasks = this.tasks.filter(element => element.isDone !== true);
    this.completedTasks = res.filter(value => value.isDone === true);
    this.sortTasks(this.startSortValue);
    
    
  });
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    let taskID = event.item.element.nativeElement.id;
    let task = this.tasks.find(element => element._id === taskID);
    console.log(event.item.element);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(task?.category !== 'expired'){
        if(task !== undefined){
          this.onChange(task);
        }  
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
  }
}
