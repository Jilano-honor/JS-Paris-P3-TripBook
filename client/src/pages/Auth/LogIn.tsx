import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { AppContextInterface } from "../../types/type";
import "./logIn.css";
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
				const newUser = await response.json();
				setUser(newUser);
				navigate(`/profile/${newUser.id_user}`); 
			} else setError("Veuillez remplir tous les champs.");
		} catch (error) {
			console.error(error);
			setError("une erreur est survenue");
		}
	};
	const NavigateToRegister = () => {
		navigate("/register");
	};

	return (
		<>
			{error && error}
			<section className="backgroundLogin">
				<section className="formulaireLogin">
					{error && error}
					<form onSubmit={submitLogin}>
						<div className="Email">
							<label htmlFor="email">Email :</label>
							<input type="email" id="email" name="email" ref={emailRef} />
						</div>
						<div className="Password">
							<label htmlFor="password">Password :</label>
							<input
								type="password"
								id="password"
								name="password"
								ref={passwordRef}
							/>
						</div>
						<div className="logInandLogOutBlock">
							<input type="submit" value="Se connecter" />
						</div>
					</form>
					<p className="registerText">
						Tu n'as pas encore de compte ?{" "}
						<button
							type="button"
							className="registerButton"
							onClick={NavigateToRegister}
						>
							<u>M'inscrire maintenant !</u>
						</button>
					</p>
				</section>
			</section>
		</>
	);
}
export default LogIn;
