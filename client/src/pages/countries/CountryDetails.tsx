import { useLocation, useNavigate } from "react-router-dom";
import Voyages from "../../assets/images/Voyages.jpg";
import "./CountryDetails.css";
import buttonback from "../../assets/images/buttonback.png";
import type Country from "../../types/Country";

const CountryDetailsPage = () => {
	const location = useLocation();
	const country = location.state as Country;
	const navigate = useNavigate();

	const handleNavigation = (id_trip: number) => {
		navigate(`/trips/${id_trip}`, { state: country });
	};

	const handleBackClick = () => {
		if (document.referrer.includes("/countries")) {
			navigate("/countries");
		} else {
			navigate(-1);
		}
	};

	if (!country) {
		return <p>Aucun pays trouvé.</p>;
	}

	return (
		<div className="container">
			<div className="banner">
				<img className="banner-img" src={Voyages} alt="Voyages" />
				<h1 className="title">{country.country_name}</h1>
			</div>

			<div className="tags">
				<div className="tag">
					<img
						src={`../${country.tag_photo}`}
						alt={`Tag de ${country.tag_name}`}
					/>
					<span>{country.tag_name}</span> {/* Ajout du texte ici */}
				</div>
				<div className="tag-flag">
					<img
						src={`.././flags/${country.flag}.png`}
						alt={`Drapeau de ${country.country_name}`}
					/>
					<span>{country.country_name}</span> {/* Ajout du texte ici */}
				</div>
			</div>

			<div className="trips-section">
				<h2 className="trips-title">Expériences de voyage</h2>
				<div className="trips-container">
					{country.trip.slice(0, 3).map((t) => (
						<div className="details-trip-card" key={t.id_trip}>
							<img
								src={
									t?.photo?.includes("http")
										? t.photo
										: `http://localhost:3310/upload/${t?.photo}`
								}
								alt={`nom : ${t?.name}`}
								className="trip-photo"
								onClick={() => handleNavigation(t.id_trip)}
								onKeyDown={() => handleNavigation(t.id_trip)}
							/>
							<h3 className="trip-name">{t.name}</h3>
						</div>
					))}
				</div>
			</div>
			<div className="button-container">
				<div className="backButton">
					<button
						type="button"
						className="button-back"
						onClick={handleBackClick}
					>
						<img className="img-back-button" src={buttonback} alt="button" />
					</button>
				</div>
				<div className="voirPlusButton">
					<button
						type="button"
						className="button-voir-plus wrapper"
						onClick={() =>
							navigate(
								`/countries/${country.country_name.toLocaleLowerCase()}/trips`,
								{
									state: country,
								},
							)
						}
					>
						<span>Voir plus</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CountryDetailsPage;
