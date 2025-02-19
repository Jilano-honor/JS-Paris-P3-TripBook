import { Link, useLocation } from "react-router-dom";
import connexionImage from "../../assets/images/Icon_buton_connexion.png";
import inscriptionImage from "../../assets/images/Icon_buton_profil.png";
import Logo from "../../assets/images/Logo_tripBook.png";
import pointdinterrogation from "../../assets/images/pointdinterrogation.png";
import reservationImage from "../../assets/images/reservation.png";

import "./NavBar.css";

function NavBar() {
	const location = useLocation();

	const isAuthPage =
		location.pathname === "/Login" || location.pathname === "/register";

	return (
		<nav className="Navigation">
			<Link to="/">
				<img src={Logo} alt="Logo TripBook" id="Logo" />
			</Link>

			{!isAuthPage && (
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
							<img src={pointdinterrogation} alt="reservation" />
							<p>Info</p>
						</button>
					</Link>
				</div>
			)}
		</nav>
	);
}

export default NavBar;
