import { axios } from './axios';

import { User, UserLogin, UserRegister } from '../types/User';

export const loginRequest = (user: UserLogin) =>
	axios.post<{ message: string; data: { user: User; token: string } }>(
		`/auth/signin`,
		user
	);

export const registerRequest = (user: UserRegister) =>
	axios.post<{ message: string; data: { user: User; token: string } }>(
		`/auth/signup`,
		user
	);

export const logoutRequest = () => axios.post(`/auth/logout`);

export const validateTokenRequest = () => axios.get(`/auth/validate`);
