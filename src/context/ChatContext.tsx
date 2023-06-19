import { createContext, useEffect, useState } from 'react';
import { useAuth, useSocket } from '.';
import { MessageBase, MessageReceived } from '@/types/User';
import {
	Chat,
	ChatContext as ChatContextType,
	createDefaultChat,
} from '@/types/Chat';
import { sendLog } from '@/api/users';

export const ChatContext = createContext<ChatContextType>(
	{} as ChatContextType
);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
	const { socket } = useSocket();
	const { user } = useAuth();

	const [currentChat, setCurrentChat] = useState<Chat>(createDefaultChat());
	const [chats, setChats] = useState<Chat[]>([]);

	function selectChat(chat: Chat) {
		chat.unreadMessages = 0;
		setCurrentChat(chat);
	}

	function sendMessage(content: string) {
		const message: MessageBase = {
			content,
			from: user._id,
			to: currentChat._id,
			fromSelf: true,
		};

		sendLog({
			metodo: 'socket',
			peticion: 'chat/message',
			respuesta: 'message',
			servicio: 'frontend',
		});

		socket.emit('private_message', message);
	}

	useEffect(() => {
		const onChatsEvent = (data: Chat[]) => {
			const chats = data.map((chat) => {
				if (chat._id === currentChat._id) chat.unreadMessages = 0;
				chat.messages = chat.messages.map((message) => {
					message.fromSelf = user._id === message.from;
					return message;
				});

				return chat;
			});
			setChats(chats);
		};

		function onMessageEvent(message: MessageReceived) {
			setChats((chats) => {
				const newChats = [...chats];
				const chatIndex = newChats.findIndex((chat) => chat._id === message.to);
				message.fromSelf = user._id === message.from;
				newChats[chatIndex].messages.push(message);
				if (currentChat._id !== message.to) {
					newChats[chatIndex].unreadMessages
						? newChats[chatIndex].unreadMessages++
						: (newChats[chatIndex].unreadMessages = 1);
				} else {
					newChats[chatIndex].unreadMessages = 0;
				}
				return newChats;
			});
		}

		function onChatCreated(chat: Chat) {
			socket.emit('join_chat', chat._id);
			sendLog({
				metodo: 'socket',
				peticion: 'chat/create',
				respuesta: 'chat',
				servicio: 'frontend',
			});
			setChats((chats) => {
				const newChats = [...chats];
				newChats.push(chat);
				return newChats;
			});
		}

		function onChatJoined(chatID: string) {
			console.log('joined_chat', { chatID });
		}

		socket.on('chats', onChatsEvent);
		socket.on('private_message', onMessageEvent);
		socket.on('chat_created', onChatCreated);
		socket.on('chat_joined', onChatJoined);

		return () => {
			socket.off('chats', onChatsEvent);
			socket.off('private_message', onMessageEvent);
			socket.off('chat_created', onChatCreated);
			socket.off('chat_joined', onChatJoined);
		};
	}, [user, currentChat]);

	return (
		<ChatContext.Provider
			value={{
				chats,
				currentChat,
				selectChat,
				sendMessage,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
