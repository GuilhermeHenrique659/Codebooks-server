import { IObserver } from "../../../../shared/observer/IObserver";

export class NotificationObserver {
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