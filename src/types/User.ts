export interface UserLogin {
	email: string;
	password: string;
}

export interface User {
	id: string;
	name: string;
	nickname: string;
	email: string;
	avatar: string;
	token: string;
}

export interface UserContext {
	user: User;
	signIn: (user: UserLogin) => Promise<void>;
	logout: () => Promise<void>;
	isAuthenticated: boolean;
	errors: string[];
}
