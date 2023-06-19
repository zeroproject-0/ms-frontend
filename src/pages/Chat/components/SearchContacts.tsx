import { getAllUsersRequest } from '@/api/users';
import { useAuth } from '@/context';
import { User } from '@/types/User';
import { useEffect, useState } from 'react';

interface SearchContactsProps {
	setIsOpenSearch: (open: boolean) => void;
}

export function SearchContacts({ setIsOpenSearch }: SearchContactsProps) {
	const { user, addContact } = useAuth();
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

	return (
		<>
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
							<div className="ml-2 text-sm font-semibold">{contact.email}</div>
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
		</>
	);
}
