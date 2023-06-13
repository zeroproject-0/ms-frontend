import { useSocket } from '@/context';
import { useRef, useState } from 'react';

export function MyForm() {
	const { sendMessage } = useSocket();
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);

		sendMessage({ content: value, fromSelf: true });
		setIsLoading(false);
		if (inputRef.current) inputRef.current.value = '';
	}

	return (
		<form onSubmit={onSubmit}>
			<input
				ref={inputRef}
				type="text"
				onChange={(event) => setValue(event.target.value)}
			/>

			<button type="submit" disabled={isLoading}>
				Send
			</button>
		</form>
	);
}
