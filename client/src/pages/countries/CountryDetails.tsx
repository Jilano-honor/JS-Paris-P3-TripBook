import { useLocation, useNavigate } from "react-router-dom";
import Voyages from "../../assets/images/Voyages.jpg";
import "./CountryDetails.css";
import buttonback from "../../assets/images/buttonback.png";
import type Country from "../../types/Country";

const CountryDetailsPage = () => {
	const location = useLocation();
	const country = location.state as Country;
	const navigate = useNavigate();

	if (!country) {
		return <p>Aucun pays trouvé.</p>;
	}

	return (
		<div className="container">
			<div className="banner">
				<img src={Voyages} alt="Voyages" />
				<h1 className="title">{country.country_name}</h1>
			</div>

			<div className="tags">
				<div className="tag">
					<h2 className="tag-name">{country.tag_name}</h2>
					<img
						src={`../${country.tag_photo}`}
						alt={`Tag de ${country.tag_name} `}
					/>
				</div>
				<div className="tag">
					<h2 className="tag-name">{country.country_name} </h2>
					<img
						src={`.././flags/${country.flag}.png`}
						alt={`Drapeau  de ${country.country_name}`}
					/>
				</div>
			</div>

			<div className="trips-section">
				<h2 className="trips-title">Voyages effectués</h2>
				<div className="trips-container">
					{country.trip.map((t) => (
						<div className="trip-card" key={t.id_trip}>
							<img src={t.photo} alt={t.name} />
							<h3 className="trip-name">{t.name}</h3>
						</div>
					))}
				</div>
			</div>
			<div className="button-container">
				<button
					type="button"
					className="button-back"
					onClick={() => navigate("/")}
				>
					<img className="img-back-button" src={buttonback} alt="button" />
				</button>
				<button
					type="button"
					className="button-voir-plus"
					onClick={() => navigate(`/countries/${country.country_name}/trips`)}
				>
					Voir plus
				</button>
			</div>
		</div>
	);
};

export default CountryDetailsPage;
