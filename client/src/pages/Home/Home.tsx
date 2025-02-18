import "./Home.css";
import { useEffect, useState } from "react";
import Themebar from "../../components/ThemeBar/ThemeBarHome";
import HomeSearchbar from "./HomeSearchbar";

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
				<header>
					Trouvez votre prochaine destination et partagez vos expériences pour
					inspirer la communauté !
				</header>
				<div id="search-theme">
					<HomeSearchbar />
					<Themebar themes={themes} />
				</div>
			</div>
		</>
	);
}

export default Home;
