import "./Home.css";
import { useEffect, useState } from "react";
import earth from "../../../public/video/42354-431511383.mp4";
import Themebar from "../../components/ThemeBar/ThemeBarHome";
import HomeSearchbar from "../trips/HomeSearchbar";

function Home() {
	const [themes, setThemes] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3310/api/theme")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Réseau de réponse non ok");
				}
				return response.json();
			})
			.then((data) => {
				setThemes(data.theme);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des données :", error);
			});
	}, []);

	return (
		<>
			<div className="home-container">
				<video autoPlay loop muted className="background-video">
					<source src={earth} type="video/mp4" />
					Votre navigateur ne supporte pas les vidéos.
				</video>
				<header>
					Trouvez votre prochaine destination et partagez vos expériences pour
					inspirer la communauté !
				</header>
				<HomeSearchbar />
				<Themebar themes={themes} />
			</div>
		</>
	);
}

export default Home;
