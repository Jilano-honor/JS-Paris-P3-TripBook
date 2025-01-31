import { useLocation } from "react-router-dom";

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
		<div>
			<div>
				{country.trip.map((t) => (
					<h1 key={t.id_trip}>{t?.name}</h1>
				))}
				<h1>{country.tag_name}</h1>
				<h1>{country.country_name}</h1>
				<img src={country.flag} alt={`Drapeau de ${country.country_name}`} />
				<h3>Tag: {country.tag_name}</h3>
				<img src={country.tag_photo} alt={`Tag de ${country.tag_name}`} />
			</div>
		</div>
	);
};

export default CountryDetailsPage;
