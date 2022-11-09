export class Like {
    public userId: string;

    public postId: string;

    constructor(props: Like) {
        Object.assign(this, props);
    }
}