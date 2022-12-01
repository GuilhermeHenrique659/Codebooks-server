export interface IObserver {
    update(data?: any): Promise<void>
}