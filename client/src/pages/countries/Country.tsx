import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./country.css";
import type Trip from "../../types/type";
function Country() {
	const [trips, setTrips] = useState([]);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const getTrips = async () => {
			try {
				const result = await fetch(
					`${import.meta.env.VITE_API_URL}/api/countries/${id}/trips`,
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
	}, [id]);
	const handleNavigation = (idtrip: number) => {
		navigate(`/trips/${idtrip}`);
	};
	console.log(trips);

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
			<div>hello</div>
		</>
	);
}
export default Country;
