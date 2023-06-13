import _axios from 'axios';

export const axios = _axios.create({
	baseURL: 'http://localhost:5001/v1',
	withCredentials: true,
});
