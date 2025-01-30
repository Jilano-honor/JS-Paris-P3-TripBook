import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

function register() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const firstnameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);
	const phonenNumberRef = useRef<HTMLInputElement>(null);
	const bornAtRef = useRef<HTMLInputElement>(null);
	const avatarRef = useRef<HTMLInputElement>(null);

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const validateRegister: FormEventHandler = async (e) => {
		e.preventDefault();

		try {
			const result = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstname: (firstnameRef.current as HTMLInputElement).value,
					lastname: (lastnameRef.current as HTMLInputElement).value,
					email: (emailRef.current as HTMLInputElement).value,
					phone_number: (phonenNumberRef.current as HTMLInputElement).value,
					born_at: (bornAtRef.current as HTMLInputElement).value,
					avatar: (avatarRef.current as HTMLInputElement).value,
					password: (passwordRef.current as HTMLInputElement).value,
				}),
			});
			if (result.status === 201) navigate("/login");
			else setError("Veuillez remplir tous les champs");
		} catch (error) {
			console.error(error);
			setError("Une erreur est survenue...");
		}
	};

	return (
		<>
			{error && error}
			<form onSubmit={validateRegister}>
				<label htmlFor="firstname">Firstname:</label>
				<input type="text" name="firstname" id="firstname" ref={firstnameRef} />

				<label htmlFor="lastname">Last Name:</label>
				<input type="text" name="lastname" id="lastname" ref={lastnameRef} />

				<label htmlFor="email">Email:</label>
				<input type="email" name="email" id="email" ref={emailRef} />

				<label htmlFor="phoneNumber">Phone Number:</label>
				<input
					type="tel"
					name="phoneNumber"
					id="phoneNumber"
					ref={phonenNumberRef}
				/>

				<label htmlFor="bornAt">Date of Birth:</label>
				<input type="date" name="bornAt" id="bornAt" ref={bornAtRef} />

				<label htmlFor="avatar">Avatar:</label>
				<input type="file" name="avatar" id="avatar" ref={avatarRef} />

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					name="password"
					id="password"
					ref={passwordRef}
				/>

				<input type="submit" value="s'inscrire" />
			</form>
		</>
	);
}
export default register;
