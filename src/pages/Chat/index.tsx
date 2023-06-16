import { ChatLogo } from '@/components/ChatLogo';
import { UserCard } from './components/UserCard';
import { ChatList } from './components/ChatList';
import { MessageList } from './components/MessageList';
import { useAuth, useChat, useSocket } from '@/context';
import { FormMessage } from './components/FormMessage';
import { useState } from 'react';
import { User } from '@/types/User';

export function ChatPage() {
	const { socket } = useSocket();
	const { chats } = useChat();
	const { logout, user } = useAuth();
	const [open, setOpen] = useState(false);

	const handleClickContact = (user: User) => {
		const usersIds = [user._id];
		socket.emit('create_chat', { usersIds, isPrivate: true });

		setOpen(false);
	};
	return (
		<>
			{open && (
				<div className="fixed inset-0 left-0 top-0 z-10 h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-black/30">
					<div className="pointer-events-none inset-0 z-20 relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
						<div className="pointer-events-auto z-30 relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none ">
							<div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4">
								<h5 className="text-xl font-medium leading-normal text-neutral-800 ">
									Contactos
								</h5>
								<button
									onClick={() => setOpen(false)}
									type="button"
									className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
									aria-label="Close"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<div className="relative p-4">
								{user.contacts.map((contact) => (
									<div
										key={contact._id}
										onClick={() => {
											handleClickContact(contact);
										}}
									>
										<div className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
											<div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
												{contact.name[0]}
											</div>
											<div className="ml-2 text-sm font-semibold">
												{contact.email}
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4">
								<button
									onClick={() => setOpen(false)}
									type="button"
									className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
								>
									Close
								</button>
								<button
									onClick={() => {
										setOpen(false);
									}}
									className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
								>
									<span>Crear Chat</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="flex relative h-screen antialiased text-gray-800">
				<div className="flex flex-row h-full overflow-x-hidden">
					<div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
						<ChatLogo />
						<UserCard />
						<div className="flex flex-col mt-8">
							<div className="flex flex-row items-center justify-between text-xs">
								<span className="font-bold">Chats</span>
								<span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
									{chats.length}
								</span>
							</div>
							<ChatList />
							{/* <div className="flex flex-row items-center justify-between text-xs mt-6">
							<span className="font-bold">Archivados</span>
							<span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"> */}
							{/* //TODO: Chats archivados */}
							{/* </span>
						</div>
						<div className="flex flex-col space-y-1 mt-4 -mx-2"> */}
							{/* <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
								<div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
									H
								</div>
								<div className="ml-2 text-sm font-semibold">Henry Boyd</div>
							</button> */}
							{/* </div> */}
							<div>
								<button
									onClick={() => logout()}
									className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
								>
									<span>Cerrar Sesión</span>
								</button>
								<button
									onClick={() => {
										setOpen(true);
									}}
									className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
								>
									<span>Crear Chat</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-auto h-full p-6">
					<div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
						<MessageList />
						<FormMessage />
					</div>
				</div>
			</div>
		</>
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
