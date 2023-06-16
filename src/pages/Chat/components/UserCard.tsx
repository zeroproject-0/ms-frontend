import { useAuth } from '@/context';

export function UserCard() {
	const { user } = useAuth();

	return (
		<div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
			{/* <div className="h-20 w-20 rounded-full border overflow-hidden">
				<img
					src="https://avatars3.githubusercontent.com/u/2763884?s=128"
					alt="Avatar"
					className="h-full w-full"
				/>
			</div> */}
			<div className="text-sm font-semibold mt-2">{user.nickname}</div>
			<div className="text-xs text-gray-500">{user.email}</div>
		</div>
	);
}
