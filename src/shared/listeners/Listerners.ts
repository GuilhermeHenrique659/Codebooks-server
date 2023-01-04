import { Server, Socket } from "socket.io";
import { AuthenticateMiddleware } from "../middleware/AuthenticationMiddleware";

class UserSocket {
    clienId: string;
    userId: string;

    constructor(props: UserSocket) {
        Object.assign(this, props);
    }
}


export class Listeners {

    private userSockets: UserSocket[] = []
    private socket: Server

    constructor(socket: Server) {
        this.socket = socket
    }

    public getClientUserId(userId: string): string[] {
        const clientIds: string[] = []
        this.userSockets.forEach((user) => {
            if (user.userId === userId)
                clientIds.push(user.clienId);
        });

        return clientIds
    }

    public addUserSocket(socket: Socket) {
        try {
            const token = AuthenticateMiddleware.AuthenticatedToken(socket.handshake.headers.token as string);
            this.userSockets.push(new UserSocket({
                clienId: socket.id,
                userId: token,
            }));
        } catch (error) {
            return error
        }
    }

    public removeUserSocket(clienteId: string) {
        const index = this.userSockets.findIndex((user) => user.clienId === clienteId);
        this.userSockets.splice(index, 1);
    }

    public sendEvents(userId: string, listenerName: string, data: any) {
        const clientIds = this.getClientUserId(userId);
        if (clientIds.length)
            this.socket.to(clientIds).emit(listenerName, data);
    }

}

