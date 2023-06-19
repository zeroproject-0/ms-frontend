interface ModalProps {
	isOpen: boolean;
	children: React.ReactNode;
}

export function Modal({ isOpen, children }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 left-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-black/30">
			<div className="pointer-events-none inset-0 z-20 relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
				<div className="pointer-events-auto z-30 relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none ">
					{children}
				</div>
			</div>
		</div>
	);
}
