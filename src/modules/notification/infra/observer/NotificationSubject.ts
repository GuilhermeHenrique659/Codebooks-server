import { IObserver } from "../../../../shared/observer/IObserver";
import { ISubject } from "../../../../shared/observer/ISubject";

export class NotificationSubject implements ISubject {
    private observerList: Array<IObserver> = [];

    public add(observer: IObserver) {
        this.observerList.push(observer);
    }

    public async notify(data: any) {
        for (const observer of this.observerList) {
            await observer.update(data)
        }
    }
}