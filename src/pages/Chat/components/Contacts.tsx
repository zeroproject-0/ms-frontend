import { useAuth, useChat, useSocket } from '@/context';
import { Chat } from '@/types/Chat';
import { User } from '@/types/User';

interface ContactsProps {
	setOpen: (open: boolean) => void;
}

export function Contacts({ setOpen }: ContactsProps) {
	const { user } = useAuth();
	const { chats, selectChat } = useChat();
	const { socket } = useSocket();

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
							<div className="ml-2 text-sm font-semibold">{contact.email}</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
