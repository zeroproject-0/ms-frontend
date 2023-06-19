import { MessageReceived, User } from './User';

export interface ChatContext {
	chats: Chat[];
	currentChat: Chat;
	selectChat: (chat: Chat) => void;
	sendMessage: (content: string) => void;
}

export interface ChatBase {
	name: string;
	description: string;
	members: { user: User; isAdmin: boolean }[];
	isPrivate: boolean;
	messages: MessageReceived[];
}

export interface Chat extends ChatBase {
	_id: string;
	unreadMessages: number;
}

export const createDefaultChat = (): Chat => {
	return {
		name: '',
		description: '',
		members: [],
		isPrivate: false,
		messages: [],
		_id: '',
		unreadMessages: 0,
	};
};
