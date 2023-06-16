import { MessageReceived } from '@/types/User';

interface MessageItemProps {
	message: MessageReceived;
}

export function MessageItem({ message }: MessageItemProps) {
	const background = message.fromSelf ? 'bg-indigo-100' : 'bg-white';

	return (
		<div
			className={
				message.fromSelf
					? 'col-start-6 col-end-13 p-3 rounded-lg'
					: 'flex flex-row items-center'
			}
		>
			<div
				className={`flex items-center justify-start ${
					message.fromSelf ? 'flex-row-reverse' : 'my-2'
				} `}
			>
				<div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
					{/* //TODO: Avatar */}
					{message.fromSelf ? 'A' : 'B'}
				</div>
				<div
					className={`relative ml-3 text-sm ${background} py-2 px-4 shadow rounded-xl`}
				>
					<div>{message.content}</div>
					{/* <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
									Seen
								</div> */}
				</div>
			</div>
		</div>
	);
}
