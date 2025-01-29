import "./Home.css";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Themebar from "../../components/ThemeBar/ThemeBar";

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
			<div className="home-container">
				<NavBar />
				<header>
					Trouvez votre prochaine destination et partagez vos expériences pour
					inspirer la communauté !
				</header>
				<Themebar themes={themes} />
				<Footer />
			</div>
		</>
	);
}

export default Home;
