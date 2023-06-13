import { useEffect } from 'react';
import { SocketEvent } from '@/types/Socket';
import { useSocket } from '@/context';

export function useSocketEvents<T>(events: SocketEvent<T>[]) {
	const { socket } = useSocket();

	useEffect(() => {
		events.forEach(({ ev, handler }) => {
			socket.on(ev, handler);
		});

		return () => {
			events.forEach(({ ev, handler }) => {
				socket.off(ev, handler);
			});
		};
	}, []);
}
