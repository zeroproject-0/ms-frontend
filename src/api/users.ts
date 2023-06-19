import { User } from '@/types/User';
import { axios } from './axios';

export const getAllUsersRequest = () =>
	axios.get<{ message: string; data: User[] }>(`/users`);

export const addContactRequest = (userID: string, contactToAdd: string) =>
	axios.post<{ message: string; data: User }>(`/users/contact/${userID}`, {
		contactID: contactToAdd,
	});

const SOCKET_URL = import.meta.env.VITE_API_CHATS;

export const sendLog = ({
	metodo,
	peticion,
	servicio,
	respuesta,
}: {
	metodo: string;
	peticion: string;
	servicio: string;
	respuesta: string;
}) => {
	fetch(`${SOCKET_URL}/log`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			metodo,
			peticion,
			servicio,
			respuesta,
		}),
	});
};
