import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserLogin } from '../../types/User';
import { useAuth } from '../../context';
import { useEffect } from 'react';

export function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { user, signIn, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const onSubmit = handleSubmit(async (data) => signIn(data as UserLogin));

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/chat');
		}
	}, [isAuthenticated]);

	return (
		<section>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					{...register('email', { required: true })}
					placeholder="Correo Electrónico"
				/>
				{errors.email && <span>Este campo es requerido</span>}
				<input
					type="password"
					{...register('password', { required: true })}
					placeholder="Contraseña"
				/>
				{errors.password && <span>Este campo es requerido</span>}

				<button type="submit">Iniciar Sesión</button>
			</form>
			{isAuthenticated ? <code>{JSON.stringify(user)}</code> : 'not logged'}
		</section>
	);
}
