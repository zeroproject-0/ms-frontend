import { ChatLogo } from '@/components/ChatLogo';
import { useAuth } from '@/context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserRegister } from '@/types/User';
import { InputForm } from '@/components/InputForm';

export function RegisterPage() {
	const { isAuthenticated, signUp, errors: requestErrors } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (data) => signUp(data as UserRegister));

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
					Registro
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={onSubmit}>
					<InputForm
						type="email"
						name="email"
						label="Correo Electrónico:"
						register={register}
						errors={errors}
					/>
					<InputForm
						type="password"
						name="password"
						label="Contraseña:"
						register={register}
						errors={errors}
					/>
					<InputForm
						type="text"
						name="name"
						label="Nombre:"
						register={register}
						errors={errors}
					/>
					<InputForm
						type="text"
						name="lastname"
						label="Apellido:"
						register={register}
						errors={errors}
					/>
					<InputForm
						type="text"
						name="nickname"
						label="Nombre de usuario:"
						register={register}
						errors={errors}
					/>
					{requestErrors.map((error) => (
						<span className="text-red-600">{error.message}</span>
					))}
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Registrarse
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
