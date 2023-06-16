import { useChat } from '@/context';
import { MessageItem } from './MessageItem';
import { useEffect, useRef } from 'react';

export function MessageList() {
	const { currentChat } = useChat();
	const messageEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollToBottom();
	}, [currentChat]);

	const scrollToBottom = () => {
		if (messageEndRef.current)
			messageEndRef.current.scrollIntoView({
				behavior: 'auto',
			});
	};

	return (
		<div className="flex flex-col h-full overflow-x-auto mb-4">
			<div className="flex flex-col h-full">
				{currentChat._id !== '' &&
					currentChat.messages.map((message) => {
						return (
							<>
								<div className="grid grid-cols-2 gap-y-2">
									<MessageItem key={message._id} message={message} />
								</div>
							</>
						);
					})}
				<div style={{ float: 'left', clear: 'both' }} ref={messageEndRef}></div>
			</div>
		</div>
	);
}
