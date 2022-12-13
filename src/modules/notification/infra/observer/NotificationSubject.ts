import { IObserver } from "../../../../shared/observer/IObserver";
import { ISubject } from "../../../../shared/observer/ISubject";

export class NotificationSubject implements ISubject {
    private observerList: Array<IObserver> = [];

    public add(observer: IObserver) {
        this.observerList.push(observer);
    }

    public remove(observer: IObserver): void {
        const index = this.observerList.indexOf(observer);
        this.observerList.splice(index, 1);
    }

    public async notify(data: any) {
        for (const observer of this.observerList) {
            await observer.update(data)
        }
    }
}