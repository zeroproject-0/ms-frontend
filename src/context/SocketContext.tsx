import { SocketContext as SocketContextType } from '@/types/Socket';
import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const socket = io('http://localhost:5000');

export const SocketContext = createContext<SocketContextType | never>(
	null as never
);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<any>([]);
	const [selectedUser, setSelectedUser] = useState<any>({ messages: [] });

	function sendMessage(message: { content: string; fromSelf: boolean }) {
		socket.emit('private_message', {
			content: message.content,
			to: selectedUser.userID,
		});

		setUsers((users: any) => {
			const newUsers = [...users];
			const userIndex = newUsers.findIndex(
				(user: any) => user.userID === selectedUser.userID
			);
			newUsers[userIndex].messages.push(message);
			return newUsers;
		});
	}

	useEffect(() => {
		const onUsersEvent = (data: any) => {
			const newUsers = data.map((user: any) => {
				user.self = user.userID === socket.id;
				return user;
			});
			console.log({ newUsers });
			setUsers(newUsers);
		};

		function onUserConnectedEvent(data: any) {
			setUsers((users: any) => {
				console.log({ users });
				const newUsers = [...users, data];
				console.log({ newUsers });
				return newUsers;
			});
		}

		function onMessageEvent(message: any) {
			console.log('message: ', message);
			setUsers((users: any) => {
				const newUsers = [...users];
				const userIndex = newUsers.findIndex(
					(user: any) => user.userID === message.from
				);
				console.log({ userIndex });
				newUsers[userIndex].messages.push(message);
				return newUsers;
			});
		}

		function onSessionEvent(data: any) {
			console.log('session: ', data);
			localStorage.setItem('sessionID', data.sessionID);
		}

		socket.on('users', onUsersEvent);
		socket.on('user_connected', onUserConnectedEvent);
		socket.on('session', onSessionEvent);
		socket.on('private_message', onMessageEvent);

		return () => {
			socket.off('users', onUsersEvent);
			socket.off('user_connected', onUserConnectedEvent);
			socket.off('session', onSessionEvent);
			socket.off('private_message', onMessageEvent);
		};
	}, []);

	return (
		<SocketContext.Provider
			value={{ socket, users, selectedUser, setSelectedUser, sendMessage }}
		>
			{children}
		</SocketContext.Provider>
	);
};
