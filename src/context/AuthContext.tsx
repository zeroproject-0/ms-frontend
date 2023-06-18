import React, { createContext, useEffect, useState } from 'react';
import { loginRequest, logoutRequest, validateTokenRequest } from '../api/auth';
import { User, UserContext, UserLogin } from '../types/User';
import { AxiosError } from 'axios';
import { Cookies } from 'typescript-cookie';
import { useSocket } from '.';

export const AuthContext = createContext<UserContext>({} as UserContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { socket, sessionID, removeSessionID } = useSocket();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [user, setUser] = useState<User | never>(null as never);

	const signIn = async (data: UserLogin) => {
		try {
			const response = await loginRequest(data);

			if (!response.data.data) {
				throw new Error('No data received');
			}

			const token = response.data.data.token as string;
			const user = response.data.data.user as User;
			user.token = token;
			Cookies.set('token', token);
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
			setUser(null as never);
			setIsAuthenticated(false);
			socket.auth = { token: null, sessionID: null };
			socket.connected && socket.disconnect();
			removeSessionID();
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

			if (!token || sessionID === '') {
				setIsAuthenticated(false);
				setUser(null as never);
				socket.auth = { token: null, sessionID: null };
				socket.connected && socket.disconnect();
				return;
			}

			try {
				const res = await validateTokenRequest();

				const newUser = res.data.data as User;
				setUser(newUser);
				setIsAuthenticated(true);
				socket.auth = { token, sessionID };
				socket.disconnect();
				setTimeout(() => {
					socket.connect();
				}, 100);
			} catch (error) {
				setIsAuthenticated(false);
				setUser(null as never);
				socket.auth = { token: null, sessionID: null };
			}
		}

		async function fetchData() {
			await checkLogin();
		}
		fetchData();
	}, [sessionID]);

	return (
		<AuthContext.Provider
			value={{ user, signIn, logout, isAuthenticated, errors }}
		>
			{children}
		</AuthContext.Provider>
	);
};
