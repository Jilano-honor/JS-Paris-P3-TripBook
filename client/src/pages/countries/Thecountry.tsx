import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./country.css";
import type Country from "../../types/Country";
import type { Trip } from "../../types/type";
function TheCountry() {
	const [trips, setTrips] = useState([]);
	const navigate = useNavigate();
	const { name } = useParams();
	const location = useLocation();
	const country = location.state as Country;

	useEffect(() => {
		const getTrips = async () => {
			try {
				const result = await fetch(
					`${import.meta.env.VITE_API_URL}/api/countries/${country.id_country}/trips`,
					{
						method: "GET",
						headers: {
							"content-type": "application/json",
						},
					},
				);
				if (result.ok) {
					const trips = await result.json();
					setTrips(trips);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getTrips();
	}, [country.id_country]);
	const handleNavigation = (id_trip: number) => {
		navigate(`/countries/${name}/trips/${id_trip}`, { state: country });
	};

	return (
		<>
			<div className="country-allTrips-block">
				{trips.slice(0, 3).map((trip: Trip) => {
					return (
						<div key={trip.id_trip}>
							<figure className="country-trip-block">
								<figcaption key={trip.id_trip} className="country-trip-name">
									{trip.name}
								</figcaption>
								<img
									src={trip.photo}
									alt={`le nom est ${trip.name}`}
									className="country-trip-photo"
									onKeyDown={() => handleNavigation(trip.id_trip)}
									onClick={() => handleNavigation(trip.id_trip)}
								/>
							</figure>
						</div>
					);
				})}
			</div>
		</>
	);
}
export default TheCountry;
