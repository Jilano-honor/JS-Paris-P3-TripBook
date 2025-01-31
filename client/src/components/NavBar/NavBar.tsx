import { Link } from "react-router-dom";
import connexionImage from "../../assets/images/Icon_buton_connexion.png";
import inscriptionImage from "../../assets/images/Icon_buton_profil.png";
import Logo from "../../assets/images/Logo_tripBook.png";

import "./NavBar.css";

function NavBar() {
	return (
		<nav className="Navigation">
			<Link to="/">
				<img src={Logo} alt="Logo TripBook" id="Logo" />
			</Link>

			<div className="ButtonNavigation">
				<Link to="/Login">
					<button type="button" id="ConnexionButton">
						<img src={connexionImage} alt="Log In" />
						<p>Connexion</p>
					</button>
				</Link>

				<Link to="/register">
					<button type="button" id="InscriptionButton">
						<img src={inscriptionImage} alt="Sign In" />
						<p>Inscription</p>
					</button>
				</Link>
				<Link to="/trips/add">
					<button type="button">Add Trip</button>
				</Link>
			</div>
		</nav>
	);
}

export default NavBar;
