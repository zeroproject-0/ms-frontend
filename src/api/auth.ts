import { axios } from './axios';

import { UserLogin } from '../types/User';

export const loginRequest = (user: UserLogin) =>
	axios.post(`/auth/signin`, user);

export const logoutRequest = () => axios.post(`/auth/logout`);

export const validateTokenRequest = () => axios.get(`/auth/validate`);
