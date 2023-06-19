import { User } from '@/types/User';
import { axios } from './axios';

export const getAllUsersRequest = () =>
	axios.get<{ message: string; data: User[] }>(`/users`);

export const addContactRequest = (userID: string, contactToAdd: string) =>
	axios.post<{ message: string; data: User }>(`/users/contact/${userID}`, {
		contactID: contactToAdd,
	});
