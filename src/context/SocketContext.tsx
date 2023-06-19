import { sendLog } from '@/api/users';
import { SocketContext as SocketContextType } from '@/types/Socket';
import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
const SOCKET_URL = import.meta.env.VITE_API_CHATS;

const socket = io(SOCKET_URL);

export const SocketContext = createContext<SocketContextType | never>(
	null as never
);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [sessionID, setSessionID] = useState<string>('');

	function removeSessionID() {
		localStorage.removeItem('sessionID');
		setSessionID('');
	}

	useEffect(() => {
		setSessionID(localStorage.getItem('sessionID') || '');

		function onSessionEvent(data: { sessionID: string }) {
			sendLog({
				metodo: 'socket',
				peticion: 'chat/session',
				respuesta: 'sessionID',
				servicio: 'frontend',
			});
			localStorage.setItem('sessionID', data.sessionID);
		}

		socket.on('session', onSessionEvent);

		return () => {
			socket.off('session', onSessionEvent);
		};
	}, []);

	return (
		<SocketContext.Provider
			value={{
				socket,
				sessionID,
				removeSessionID,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
