import { useSocket } from '@/context';

// interface EventsProps {
// 	events: { content: string; fromSelf: boolean }[];
// }

export function Events() {
	const { selectedUser } = useSocket();

	if (!selectedUser.messages) return null;

	return (
		<ul>
			{selectedUser.messages.map((e: any, index: any) => (
				<li key={index}>
					{e.fromSelf ? 'Tu: ' : 'Elle: '}
					<code>{e.content}</code>
				</li>
			))}
		</ul>
	);
}
