import { Socket } from 'socket.io-client';

export interface SocketContext {
	socket: Socket;
	sessionID: string;
	removeSessionID: () => void;
}

export interface Session {
	sessionID: string;
	userID: string;
	socketID: string;
}
