import { ChatLogo } from '@/components/ChatLogo';
import { UserCard } from './UserCard';
import { useAuth, useChat } from '@/context';
import { ChatList } from './ChatList';

interface SideBarProps {
	fullScreen: boolean;
	setIsOpenSearch: (open: boolean) => void;
	setOpen: (open: boolean) => void;
}

export function SideBar({
	setIsOpenSearch,
	setOpen,
	fullScreen,
}: SideBarProps) {
	const { chats } = useChat();
	const { logout } = useAuth();

	return (
		<>
			<div
				className={
					!fullScreen
						? `md:flex md:flex-row h-full max-md:z-10 md:overflow-x-hidden max-md:fixed max-md:top-0 max-md:left-0 max-md:w-64 max-md:h-screen max-md:transition-all max-md:duration-300 max-md:ease-in-out max-md:right-0 `
						: 'max-md:hidden'
				}
			>
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
		</>
	);
}
