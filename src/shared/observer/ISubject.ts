import { IObserver } from "./IObserver";

export interface ISubject {
    add(observer: IObserver): void
    remove(observer: IObserver): void
    notify(data: any): Promise<void>
}