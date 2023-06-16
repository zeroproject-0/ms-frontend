import { useAuth, useChat } from '@/context';
import { useEffect } from 'react';

export function ChatList() {
	const { user } = useAuth();
	const { chats, selectChat } = useChat();

	useEffect(() => {
		// console.log('chats', chats);
	}, [chats]);

	return (
		<div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
			{chats.map((chat) => {
				const otherUser = chat.members.find(
					(member) => member.user._id !== user._id
				)?.user;

				return (
					<button
						onClick={() => selectChat(chat)}
						className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
					>
						<div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
							{chat.isPrivate && otherUser
								? otherUser.nickname[0]
								: chat.name[0]}
						</div>
						<div className="ml-2 text-sm font-semibold">
							{chat.isPrivate && otherUser ? otherUser.nickname : chat.name}
						</div>
						{chat.unreadMessages > 0 && (
							<div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
								{chat.unreadMessages}
							</div>
						)}
					</button>
				);
			})}
		</div>
	);
}
