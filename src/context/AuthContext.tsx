import React, { createContext, useEffect, useState } from 'react';
import { loginRequest, logoutRequest, validateTokenRequest } from '../api/auth';
import { User, UserContext, UserLogin } from '../types/User';
import { AxiosError } from 'axios';
import { Cookies } from 'typescript-cookie';
import { useSocket } from '.';

export const AuthContext = createContext<UserContext>({} as UserContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { socket } = useSocket();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [user, setUser] = useState<User | never>({} as User);

	const signIn = async (data: UserLogin) => {
		try {
			const response = await loginRequest(data);

			const token = response.data.data.token as string;
			const user = response.data.data.user as User;
			user.token = token;
			socket.auth = { token };
			socket.connect();
			setUser(user);
			setIsAuthenticated(true);
		} catch (error) {
			console.log((error as AxiosError).response);
			setErrors((error as AxiosError).response?.data as string[]);
			socket.auth = { token: null, sessionID: null };
		}
	};

	const logout = async () => {
		try {
			await logoutRequest();
			setIsAuthenticated(false);
			socket.auth = { token: null };
			socket.connected && socket.disconnect();
			localStorage.removeItem('sessionID');
		} catch (error) {
			console.log((error as AxiosError).response);
			setErrors((error as AxiosError).response?.data as string[]);
		}
	};

	// Clean errors after 5 seconds
	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [errors]);

	useEffect(() => {
		async function checkLogin() {
			const token = Cookies.get('token');
			const sessionID = localStorage.getItem('sessionID') as string;
			console.log('sessionID: ', sessionID);

			if (!token) {
				setIsAuthenticated(false);
				setUser(null as never);
				socket.auth = { token: null, sessionID: null };
				return;
			}

			try {
				const res = await validateTokenRequest();

				const user = res.data.data as User;
				setUser(user);
				setIsAuthenticated(true);
				socket.auth = { token };
				if (sessionID) socket.auth.sessionID = sessionID;
				console.log('socket.auth');
				console.log(socket.auth);
				!socket.connected && socket.connect();
			} catch (error) {
				setIsAuthenticated(false);
				setUser(null as never);
				socket.auth = { token: null, sessionID: null };
			}
		}
		checkLogin();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, signIn, logout, isAuthenticated, errors }}
		>
			{children}
		</AuthContext.Provider>
	);
};
