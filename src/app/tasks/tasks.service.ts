import { Injectable } from '@angular/core';
import { ITask } from './task';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(private db: Firestore) {};

  getTasks(): Observable<ITask[]>{
    const tasksRef = collection(this.db, 'Tasks');
    return collectionData(tasksRef, { idField: '_id' }) as Observable<ITask[]>
  }

  getTaskByID(id: string): Observable<ITask>{
    const taskRef = doc(this.db, `Tasks/${id}`);
    return docData(taskRef, {idField: '_id'}) as Observable<ITask>
  }

  addTask(task: ITask){
    const tasksRef = collection(this.db, 'Tasks');
    return addDoc(tasksRef, task)
  }

  editTask(task: ITask):void {
    const taskRef = doc(this.db, `Tasks/${task._id}`);
    updateDoc(taskRef, {
      title: task.title,
      description: task.description,
      deadlineDate: task.deadlineDate,
      addedDate: task.addedDate,
      isDone: task.isDone,
      category: task.category,
      user: task.user
    })
  }

  editTaskCompletion(task: ITask):void{
    const taskRef = doc(this.db, `Tasks/${task._id}`)
    updateDoc(taskRef, {isDone: task.isDone})
  }
  
  removeTask(id: string):void {
    const taskRef = doc(this.db, `Tasks/${id}`)
    deleteDoc(taskRef)
  }

}
