import { Socket } from 'socket.io-client';

export interface SocketContext {
	socket: Socket;
	users: any[];
	selectedUser: any;
	setSelectedUser: (user: any) => void;
	sendMessage: (message: { content: string; fromSelf: boolean }) => void;
}

export interface Packet<T> {
	userId: string;
	data: T;
}

export interface SocketEvent<T> {
	ev: string;
	handler(packet: Packet<T>): void;
}
