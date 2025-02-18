import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChosenCountry.css";
import type Country from "../../types/Country";
import type { Trip } from "../../types/type";
function ChosenCountry() {
	const [trips, setTrips] = useState([]);
	const navigate = useNavigate();
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
		navigate(`/trips/${id_trip}`, { state: country });
	};
	return (
		<>
			<div className="country-trips-container">
				{trips.slice(0, 3).map((trip: Trip) => (
					<figure key={trip.id_trip} className="trip-card">
						<div className="trip-card-image-wrapper">
							<img
								src={
									trip?.photo?.includes("http")
										? trip.photo
										: `http://localhost:3310/upload/${trip?.photo}`
								}
								alt={`Le nom est ${trip.name}`}
								className="trip-card-photo"
								onClick={() => handleNavigation(trip.id_trip)}
								onKeyDown={() => handleNavigation(trip.id_trip)}
							/>
						</div>
						<figcaption className="trip-card-name">{trip.name}</figcaption>
					</figure>
				))}
			</div>
		</>
	);
}
export default ChosenCountry;