import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserLogin } from '../../types/User';
import { useAuth } from '../../context';
import { useEffect } from 'react';
import { ChatLogo } from '@/components/ChatLogo';

export function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signIn, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const onSubmit = handleSubmit(async (data) => signIn(data as UserLogin));

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/chat');
		}
	}, [isAuthenticated]);

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<ChatLogo />
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Inicio de sesión
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={onSubmit}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Correo Electrónico:
						</label>
						<div className="mt-2">
							<input
								id="email"
								type="email"
								{...register('email', { required: true })}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							/>
							{errors.email && (
								<span className="text-red-600 ">Este campo es requerido</span>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Contraseña:
						</label>
						<div className="mt-2">
							<input
								id="password"
								type="password"
								{...register('password', { required: true })}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							/>
							{errors.password && (
								<span className="text-red-600">Este campo es requerido</span>
							)}
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Iniciar Sesión
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
