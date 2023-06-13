import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { UserContext } from '../types/User';
import { SocketContext } from './SocketContext';
import { SocketContext as SocketContextType } from '@/types/Socket';

export const useAuth = () => {
	const context = useContext<UserContext>(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');

	return context;
};

export const useSocket = () => {
	const context = useContext<SocketContextType>(SocketContext);
	if (!context)
		throw new Error('useSocket must be used within a SocketProvider');

	return context;
};
