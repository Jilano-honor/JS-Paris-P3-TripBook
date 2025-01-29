import "./Home.css";
import { useEffect, useState } from "react";
import Themebar from "../../components/ThemeBar";

function Home() {
	const [themes, setThemes] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3310/api/Theme")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Réseau de réponse non ok");
				}
				return response.json();
			})
			.then((data) => {
				setThemes(data.themeId);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des données :", error);
			});
	}, []);

	return (
		<>
			<div>
				<header>
					Trouvez votre prochaine destination et partagez vos expériences pour
					inspirer la communauté !
				</header>

				<Themebar themes={themes} />
			</div>
		</>
	);
}

export default Home;
