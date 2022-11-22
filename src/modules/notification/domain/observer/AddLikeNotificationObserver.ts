import { IObserver } from "../../../../shared/observer/IObserver";

export class AddLikeNotificationObserver implements IObserver {
    update(data: string){
        console.log(data);
    }
}