import { Injectable } from '@angular/core';
import { ITask } from './task';
import  data from '../../generated.json';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  tasks: ITask[] = []
  constructor() { }
  
  getTasks(): ITask[] {
    
    data.forEach((value,index) => {
      
      this.tasks[index] = {
        _id: value._id,
        title: value.title,
        description: value.description,
        deadlineDate: new Date(value.deadlineDate),
        addedDate: new Date(),
        isDone: value.isDone,
        category: value.category,
        user: value.user 
      }

    });
    
    return this.tasks;
  }
}

