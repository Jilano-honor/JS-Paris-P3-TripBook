import { useLocation } from "react-router-dom";
import Voyages from "../assets/images/Voyages.jpg";
import "./CountryDetails.css"; // Import du CSS

interface CountryAll {
	country_name: string;
	id_country: number;
	name: string;
	flag: string;
	tag_id: number;
	tag_name: string;
	tag_photo: string;
	trip: Trip[];
}

interface Trip {
	id_trip: number;
	countryName: string;
	flag: string;
	name: string;
	start_at: Date;
	end_at: Date;
	description: string;
	photo: string;
	user_id: number;
	country_id: number;
}

const CountryDetailsPage = () => {
	const location = useLocation();
	const country = location.state as CountryAll;

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
					<img src={country.tag_photo} alt={`Tag de ${country.tag_name}`} />
				</div>
				<div className="tag">
					<h2 className="tag-name">{country.country_name}</h2>
					<img src={country.flag} alt={`Drapeau de ${country.country_name}`} />
				</div>
			</div>

			<div className="trips-section">
				<h2>Voyages effectués</h2>
				<div className="trips-container">
					{country.trip.map((t) => (
						<div className="trip-card" key={t.id_trip}>
							<img src={t.photo} alt={t.name} />
							<h3>{t.name}</h3>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CountryDetailsPage;
