import { useEffect } from 'react';
import { ConnectionManager } from '@/components/ConnectionManager';
import { Events } from '@/components/Events';
import { MyForm } from '@/components/MyForm';
import { useSocket } from '@/context';

import './styles.modules.css';

interface User {
	userID: string;
	messages: { content: string; fromSelf: boolean }[];
	hasNewMessages: boolean;
}

export function ChatPage() {
	const { users, setSelectedUser } = useSocket();

	useEffect(() => {
		console.log('chat users:');
		console.log({ users });
	}, [users]);

	const handlerOnClick = (user: User) => {
		setSelectedUser(user);
	};

	return (
		<div className="chat">
			<div className="chat__sidebar">
				<h1>Usuarios</h1>
				<div className="chat__users">
					{users.map((user) => {
						if (!user) return null;
						return (
							<div
								className={
									'chat__user' + (user.self ? ' chat__user--self' : '')
								}
								key={user.userID}
								onClick={() => handlerOnClick(user)}
							>
								<p>SocketID: {user.userID}</p>
								<p>User: {user.userID}</p>
							</div>
						);
					})}
				</div>
				<ConnectionManager />
			</div>
			<div className="chat__messages">
				<Events />
				<MyForm />
			</div>
		</div>
	);
}
// const [messages, setMessages] = useState<Packet<string>[]>([]);
// const events: SocketEvent<string>[] = [
// 	{
// 		ev: 'foo',
// 		handler: (data: Packet<string>) => {
// 			setMessages((messages) => [...messages, data]);
// 		},
// 	},
// 	{
// 		ev: 'connect',
// 		handler: () => {
// 			console.log('Connected!');
// 		},
// 	},
// 	{
// 		ev: 'disconnect',
// 		handler: () => {
// 			console.log('Disconnected!');
// 		},
// 	},
// ];

// useSocketEvents(events);
