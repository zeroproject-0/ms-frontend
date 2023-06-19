import { ChatLogo } from '@/components/ChatLogo';
import { UserCard } from './components/UserCard';
import { ChatList } from './components/ChatList';
import { MessageList } from './components/MessageList';
import { useAuth, useChat, useSocket } from '@/context';
import { FormMessage } from './components/FormMessage';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { Modal } from '@/components/Modal';
import { getAllUsersRequest } from '@/api/users';
import { Chat } from '@/types/Chat';

export function ChatPage() {
	const { socket } = useSocket();
	const { chats, selectChat } = useChat();
	const { logout, user, addContact } = useAuth();
	const [open, setOpen] = useState(false);
	const [isOpenSearch, setIsOpenSearch] = useState(false);

	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		getAllUsersRequest()
			.then((res) => {
				const users = res.data.data.filter((u) => {
					if (!user.contacts.find((c) => c._id === u._id) && u._id !== user._id)
						return u;
				});
				setUsers(users);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user]);

	const handleClickContact = (u: User) => {
		if (
			chats.some(
				(c) =>
					(c.name === user._id || c.name === u._id) &&
					(c.description === user._id || c.description === u._id)
			)
		) {
			selectChat(
				chats.find(
					(c) =>
						(c.name === user._id || c.name === u._id) &&
						(c.description === user._id || c.description === u._id)
				) as Chat
			);
			setOpen(false);
			return;
		}
		const usersIds = [u._id];
		socket.emit('create_chat', { usersIds, isPrivate: true });

		setOpen(false);
	};

	return (
		<>
			<Modal isOpen={open}>
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
							className="cursor-pointer"
							onClick={() => {
								handleClickContact(contact);
							}}
						>
							<div className="flex flex-row items-center hover:bg-gray-300 rounded-xl p-2">
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
			</Modal>

			<Modal isOpen={isOpenSearch}>
				<div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4">
					<h5 className="text-xl font-medium leading-normal text-neutral-800 ">
						Buscar personas
					</h5>
					<button
						onClick={() => setIsOpenSearch(false)}
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
					{users.map((contact, idx) => (
						<div key={idx} className="flex w-full justify-between align-bottom">
							<div className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
								<div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
									{contact.name[0]}
								</div>
								<div className="ml-2 text-sm font-semibold">
									{contact.email}
								</div>
							</div>
							<button
								onClick={() => addContact(contact._id)}
								className="bg-green-500 text-white rounded-lg my-1 px-2"
							>
								Agregar
							</button>
						</div>
					))}
				</div>
			</Modal>

			<div className="flex relative h-screen antialiased text-gray-800">
				<div className="flex flex-row h-full overflow-x-hidden">
					<div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
						<ChatLogo />
						<UserCard />
						<div className="flex flex-col mt-8">
							<div className="flex flex-row items-center justify-between text-xs">
								<span className="font-bold">Chats</span>
								<div className="w-15 h-4 flex gap-2">
									<button
										onClick={() => setIsOpenSearch(true)}
										className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
									>
										+
									</button>
									<span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
										{chats.length}
									</span>
								</div>
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
