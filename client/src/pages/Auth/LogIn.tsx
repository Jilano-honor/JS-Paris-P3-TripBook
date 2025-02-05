import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { AppContextInterface } from "../../../../server/src/types/type";
function LogIn() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { setUser } = useOutletContext<AppContextInterface>();
	const submitLogin: FormEventHandler = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/login`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: (emailRef.current as HTMLInputElement).value,
						password: (passwordRef.current as HTMLInputElement).value,
					}),
				},
			);
			if (response.status === 200) {
				const user = await response.json();
				setUser(user);
				navigate("/profile");
			} else setError("Veuillez remplir tous les champs.");
		} catch (error) {
			console.error(error);
			setError("une erreur est survenue");
		}
	};
	return (
		<>
			{error && error}
			<form onSubmit={submitLogin}>
				<label htmlFor="email">Email :</label>
				<input type="email" id="email" name="email" ref={emailRef} />
				<label htmlFor="password">Password :</label>
				<input
					type="password"
					id="password"
					name="password"
					ref={passwordRef}
				/>
				<input type="submit" value="Se connecter" />
			</form>
		</>
	);
}
export default LogIn;
