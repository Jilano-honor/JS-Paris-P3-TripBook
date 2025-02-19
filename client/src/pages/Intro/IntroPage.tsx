import "./IntroPage.css";
import { useNavigate } from "react-router-dom";
function IntroPage() {
	const navigate = useNavigate();
	return (
		<div className="intro-container">
			<div className="intro-hero">
				<h1 className="intro-title">Voyagez, Partagez, Inspirez</h1>
				<p className="intro-subtitle">
					Bienvenue sur notre plateforme unique de partage de voyages !
				</p>
				<p className="intro-details">
					Vous rêvez d'aventure, d'exploration et de rencontres inoubliables ?
					Notre site est l'endroit idéal pour vous. Ici, vous pouvez découvrir
					des récits authentiques de voyageurs du monde entier, explorer des
					destinations étonnantes et obtenir des conseils pratiques pour
					planifier votre prochaine escapade.
				</p>
				<p className="intro-details">
					Que vous soyez un voyageur expérimenté ou que vous cherchiez votre
					première aventure, notre communauté vous inspire à travers des
					itinéraires, des photos et des témoignages captivants. Laissez-vous
					séduire par les histoires de ceux qui ont déjà parcouru le monde et
					commencez à imaginer votre propre voyage.
				</p>
				<p className="intro-details">
					Parcourez les différents pays, découvrez des expériences uniques et
					rejoignez-nous pour partager vos propres aventures. Le monde n'attend
					que vous !
				</p>
				<button
					type="button"
					className="intro-button"
					onClick={() => navigate("/")}
				>
					Explorer les Destinations
				</button>
			</div>
		</div>
	);
}

export default IntroPage;
