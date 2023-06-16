import { SocketContext as SocketContextType } from '@/types/Socket';
import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const socket = io('http://localhost:5000');

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
