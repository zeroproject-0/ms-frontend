import { useAuth } from '@/context';

export function ConnectionManager() {
	const { logout } = useAuth();

	const disconnect = () => {
		logout();
	};

	return (
		<>
			<button onClick={disconnect}>Cerrar Sesión</button>
		</>
	);
}
