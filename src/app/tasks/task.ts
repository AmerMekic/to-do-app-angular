import { Timestamp } from "@angular/fire/firestore";

export interface ITask {
    _id?: string,
    title: string,
    description: string,
    deadlineDate: Timestamp,
    addedDate: Timestamp,
    isDone: boolean,
    category: string,
    user: string
}
