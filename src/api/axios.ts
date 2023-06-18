import _axios from 'axios';

const API_URL = import.meta.env.VITE_API_USERS;

export const axios = _axios.create({
	baseURL: `${API_URL}/v1`,
	withCredentials: true,
});
