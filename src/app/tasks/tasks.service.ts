import { Injectable } from '@angular/core';
import { ITask } from './task';
import { addDoc, collection, collectionData, Firestore, firestoreInstance$, Timestamp } from '@angular/fire/firestore';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(private db: Firestore) {};

  getTasks(): Observable<ITask[]>{
    const tasksRef = collection(this.db, 'Tasks');
    return collectionData(tasksRef, { idField: '_id' }) as Observable<ITask[]>
  }

  addTask(task: ITask){
    const tasksRef = collection(this.db, 'Tasks');
    return addDoc(tasksRef, task)
  }

}
