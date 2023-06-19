export interface UserLogin {
	email: string;
	password: string;
}

export interface UserRegister extends UserLogin {
	name: string;
	lastname: string;
	nickname: string;
}

export interface UserBase {
	_id: string;
	email: string;
	name: string;
	nickname: string;
	avatar: string;
	lastname: string;
	contacts: User[];
	state: boolean;
}

export interface User extends UserBase {
	self: boolean;
	token: string;
	connected: boolean;
}

export interface UserContext {
	user: User;
	signUp: (user: UserRegister) => void;
	signIn: (user: UserLogin) => void;
	logout: () => Promise<void>;
	addContact: (contactID: string) => void;
	isAuthenticated: boolean;
	errors: { message: string }[];
}

export interface MessageBase {
	content: string;
	from: string;
	to: string;
	fromSelf: boolean;
}

export interface MessageReceived extends MessageBase {
	_id: string;
	author: UserBase;
	createdAt?: Date;
}
