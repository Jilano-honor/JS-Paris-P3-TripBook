import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TripCard.css";
import buttonback from "../../assets/images/buttonback.png";
import type Trip from "../../types/type";

function TripCard() {
	const [trip, setTrip] = useState<Trip | null>(null);
	const navigate = useNavigate();
	const { id_trip } = useParams();

	useEffect(() => {
		const getTrip = async () => {
			try {
				const result = await fetch(
					`${import.meta.env.VITE_API_URL}/api/trips/${id_trip}`,
					{
						method: "GET",
						headers: {
							"content-type": "application/json",
						},
					},
				);
				if (result.ok) {
					const [trip] = await result.json();
					setTrip(trip);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getTrip();
	}, [id_trip]);
	const formattedStartDate =
		trip && new Date(trip.start_at).toLocaleDateString("fr-FR");
	const formattedEndDate =
		trip && new Date(trip.end_at).toLocaleDateString("fr-FR");
	const handleNavigateBack = () => {
		navigate(`/countries/trips/${trip?.country_id}`);
	};

	return (
		<>
			<header className="tripCard-block-title">
				<h1 className="tripCard-trip-title">{trip?.name}</h1>
			</header>
			<main>
				<div className="tripCard-images-block">
					<div className="tripCard-tripImage-block">
						<img
							src={trip?.photo}
							alt={`nom : ${trip?.name}`}
							className="tripCard-trip-image"
						/>
					</div>
					<div className="tripCard-tripImage-block">
						<img
							src={trip?.flag}
							alt="country flag"
							className="tripCard-trip-image"
						/>
					</div>
				</div>

				<div className="tripCard-dates-description-block">
					<h1 className="tripCard-dates">
						<u>Dates:</u>
					</h1>
					<h2 className="tripCard-dates">{`${formattedStartDate} to ${formattedEndDate}`}</h2>
					<div className="tripCard-description-block">
						<h1 className="tripCard-description-title">Description :</h1>
						<p className="tripCard-description-text">{trip?.description}</p>
						<div className="tripCard-buttonBack-block">
							<img
								src={buttonback}
								alt="back"
								className="tripCard-buttonBack"
								onKeyDown={handleNavigateBack}
								onClick={handleNavigateBack}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
export default TripCard;
