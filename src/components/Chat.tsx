export function Chat() {
	return (
		<>
			<div>
				<div className="chat__header">
					<img src="" alt="chat image" />
					<p>chat name</p>
				</div>
				<div className="chat__body">
					<div className="">
						<ul className="chat__messages">
							<li className="chat__message chat__message--me">hola testing</li>
						</ul>
					</div>
					<form className="chat__form">
						<input type="text" placeholder="Mensaje" />
						<button type="submit">Enviar</button>
					</form>
				</div>
			</div>
		</>
	);
}
