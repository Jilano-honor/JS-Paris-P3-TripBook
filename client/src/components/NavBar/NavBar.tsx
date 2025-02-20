import { Link, useLocation, useOutletContext } from "react-router-dom";
import connexionImage from "../../assets/images/Icon_buton_connexion.png";
import inscriptionImage from "../../assets/images/Icon_buton_profil.png";
import Logo from "../../assets/images/Logo_tripBook.png";
import pointdinterrogation from "../../assets/images/pointdinterrogation.png";
import reservationImage from "../../assets/images/reservation.png";

import "./NavBar.css";
import type { AppContextInterface } from "../../types/type";

function NavBar() {
	const { user } = useOutletContext<AppContextInterface>() || { user: null };
	const location = useLocation();

	const isAuthPage =
		location.pathname === "/Login" ||
		location.pathname === "/login" ||
		location.pathname === "/register";

	return (
		<nav className="Navigation">
			<Link to="/">
				<img src={Logo} alt="Logo TripBook" id="Logo" />
			</Link>

			{/* Affichage du profil uniquement si l'utilisateur est connecté */}
			{user && !isAuthPage && (
				<Link to={`/profile/${user?.id_user}`}>
					<img src={Logo} alt="Profil" />
				</Link>
			)}

			{/* Affichage des boutons de connexion et inscription si l'utilisateur n'est pas connecté et pas sur la page auth */}
			{!user && !isAuthPage && (
				<div className="ButtonNavigation">
					<Link to="/Login">
						<button type="button" className="NavbarButton">
							<img src={connexionImage} alt="Log In" />
							<p>Connexion</p>
						</button>
					</Link>

					<Link to="/register">
						<button type="button" className="NavbarButton">
							<img src={inscriptionImage} alt="Sign In" />
							<p>Inscription</p>
						</button>
					</Link>
					<Link to="/external">
						<button type="button" className="NavbarButton">
							<img src={reservationImage} alt="reservation" />
							<p>Reservation</p>
						</button>
					</Link>

					<Link to="/intro">
						<button type="button" className="NavbarButton">
							<img src={pointdinterrogation} alt="Info" />
							<p>Info</p>
						</button>
					</Link>
				</div>
			)}

			{/* Affichage des liens Reservation et Info uniquement si l'utilisateur est connecté et pas sur les pages d'auth */}
			{user && !isAuthPage && (
				<div className="ButtonNavigation">
					<Link to="/external">
						<button type="button" className="NavbarButton">
							<img src={reservationImage} alt="reservation" />
							<p>Reservation</p>
						</button>
					</Link>

					<Link to="/intro">
						<button type="button" className="NavbarButton">
							<img src={pointdinterrogation} alt="Info" />
							<p>Info</p>
						</button>
					</Link>
				</div>
			)}
		</nav>
	);
}

export default NavBar;
