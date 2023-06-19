import { MessageList } from './components/MessageList';
import { FormMessage } from './components/FormMessage';
import { Modal } from '@/components/Modal';
import { Contacts } from './components/Contacts';
import { SearchContacts } from './components/SearchContacts';
import { useState } from 'react';
import { SideBar } from './components/SideBar';

export function ChatPage() {
	const [open, setOpen] = useState(false);
	const [isOpenSearch, setIsOpenSearch] = useState(false);

	const [sideBarOpen, setSideBarOpen] = useState(false);

	return (
		<>
			<Modal isOpen={open}>
				<Contacts setOpen={setOpen} />
			</Modal>

			<Modal isOpen={isOpenSearch}>
				<SearchContacts setIsOpenSearch={setIsOpenSearch} />
			</Modal>

			<button
				onClick={() =>
					setSideBarOpen((prev) => {
						console.log(prev);
						return !prev;
					})
				}
				className="fixed right-0 z-30 bg-indigo-500 rounded-ms md:hidden text-white p-4"
			>
				Menu
			</button>
			<div className="flex w-full">
				<SideBar
					setIsOpenSearch={setIsOpenSearch}
					setOpen={setOpen}
					fullScreen={sideBarOpen}
				/>
				<div className="flex flex-1 relative h-screen antialiased text-gray-800">
					<div className="flex flex-col flex-auto h-full p-6">
						<div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
							<MessageList />
							<FormMessage />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
