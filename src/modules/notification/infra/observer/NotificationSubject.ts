import { IObserver } from "../../../../shared/observer/IObserver";
import { ISubject } from "../../../../shared/observer/ISubject";

export class NotificationSubject implements ISubject {
    private observerList: Set<IObserver> = new Set<IObserver>();

    public add(observer: IObserver) {
        this.observerList.clear();
        this.observerList.add(observer);
    }

    public remove(observer: IObserver): void {
        this.observerList.delete(observer);
    }

    public async notify(data: any) {
        for (const observer of this.observerList) {
            await observer.update(data)
        }
    }
}