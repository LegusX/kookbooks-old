//example modal
{
	/* <Modal
id="logoutModal"
title="Are you sure you want to log out?"
primaryButton={{
	text: "Continue",
	callback: () => {
		console.log("continue");
		setLogout(false);
		logout(setUser);
		navigate("/");
	},
}}
secondaryButton={{
	text: "Cancel",
	callback: () => {},
}}
open={logoutOpen}
/> */
}

export default function Modal({
	id, //to be used in the htmlFor attribute
	title, //bolded text at top
	description, //regular text
	primaryButton, //object containing properties text, and callback function, for when button has been clicked
	secondaryButton, //object containing properties text, and callback function, for when button has been clicked
	open,
}) {
	console.log(open);
	return (
		<>
			<div
				className={
					open
						? "modal modal-bottom sm:modal-middle modal-open"
						: "modal modal-bottom sm:modal-middle"
				}
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg">{title}</h3>
					{description && <p className="py-4">{description}</p>}
					<div className="modal-action">
						{primaryButton && (
							<label
								htmlFor={id}
								className={
									secondaryButton ? "btn btn-outline btn-primary" : "btn"
								}
								onClick={() => primaryButton.callback()}
							>
								{primaryButton.text}
							</label>
						)}
						{secondaryButton && (
							<label
								htmlFor={id}
								className="btn btn-outline btn-secondary"
								onClick={() => secondaryButton.callback()}
							>
								{secondaryButton.text}
							</label>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
