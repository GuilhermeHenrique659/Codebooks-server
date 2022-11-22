import { IObserver } from "../../../../shared/observer/IObserver";

export class NotificationObserver {
    private observerList: Array<IObserver> = [];

    public add(observer: IObserver){
        this.observerList.push(observer);
    }

    public notify(data: any){
        this.observerList.forEach(observer => {
            observer.update(data);
        });
    }
}