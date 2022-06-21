import { Component, OnDestroy, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { getDay, isAfter } from 'date-fns';
import { isBefore } from 'date-fns/esm';
import { Subscription } from 'rxjs';
import { ITask } from '../tasks/task';
import { TasksService } from '../tasks/tasks.service';
import { CalendarDay } from './calendar-day';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy{
  
  leftArrow = faAngleLeft;
  rightArrow = faAngleRight;
  
  tasks!: ITask[];
  sub!: Subscription;

  test: string[] = [];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  currentDays: CalendarDay[] = [];

  days: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  months: number[] = [31, this.isLeapYear(this.currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  monthNames: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.populateTasks();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isLeapYear(year: number):boolean{
    if(year % 4 === 0 && (year % 400 === 0 || year % 100 !== 0) ){
      return true;
    }
    else{
      return false;
    }
  }

  populateTasks():void{
    this.sub = this.tasksService.getTasks().subscribe(res => {
      this.tasks = res;
      this.populateDays(this.currentMonth)
    });
  }

  populateDays(month: number):void{
    this.populateTasks();
    this.currentDays = [];
    const startingDay = getDay(new Date(this.currentYear, this.currentMonth, 1));
    if(startingDay > 0){
      this.currentDays = Array(startingDay-1).fill({day: '', task: ''});
    }
    for(let i = 1; i < this.months[this.currentMonth]+1; i++){ 
      let currentTasks = this.checkForTasks(i)
      this.currentDays.push({day: i, task: [...currentTasks]})
    }
  }

  handleNextMonth():void{
    this.currentMonth += 1;
    if(this.currentMonth === 12){
      this.currentMonth = 0;
      this.currentYear += 1;
    }
    this.populateDays(this.currentMonth)
  }

  handlePreviousMonth():void{
    this.currentMonth -= 1;
    if(this.currentMonth === -1){
      this.currentMonth = 11;
      this.currentYear -= 1;
    }
    this.populateDays(this.currentMonth)
  }

  checkForTasks(day: number):string[]{
    let taskTitles = [] as string[];
    this.test = [];
    
    this.tasks?.forEach((task: ITask) => {

      let taskDay = task.deadlineDate.toDate().getDate();
      let taskMonth = task.deadlineDate.toDate().getMonth();
      let taskYear = task.deadlineDate.toDate().getFullYear();

      if(taskDay === day && taskMonth === this.currentMonth && taskYear === this.currentYear){

        taskTitles.push(task.title);
        this.tasks = this.tasks.filter(data => data._id !== task._id)
      
      }

    })
    return taskTitles;
  }


}
