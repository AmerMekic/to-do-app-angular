export interface ITask {
    _id: string,
    title: string,
    description: string,
    deadlineDate: Date,
    addedDate: Date,
    isDone: boolean,
    category: string,
    user: string
}
