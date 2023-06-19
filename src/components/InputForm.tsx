import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputFormProps {
	label: string;
	name: string;
	type: string;
	textOnError?: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
}

export function InputForm({
	textOnError = 'Este campo es requerido',
	label,
	name,
	type,
	register,
	errors,
}: InputFormProps) {
	return (
		<div>
			<label
				htmlFor={name}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{label}
			</label>
			<div className="mt-2">
				<input
					id={name}
					type={type}
					{...register(name, { required: true })}
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
				/>
				{errors.email && <span className="text-red-600 ">{textOnError}</span>}
			</div>
		</div>
	);
}
