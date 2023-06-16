import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { UserContext } from '../types/User';
import { SocketContext } from './SocketContext';
import { ChatContext } from './ChatContext';
import { SocketContext as SocketContextType } from '@/types/Socket';
import { ChatContext as ChatContextType } from '@/types/Chat';

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

export const useChat = () => {
	const context = useContext<ChatContextType>(ChatContext);
	if (!context) throw new Error('useChat must be used within a ChatProvider');
	return context;
};
