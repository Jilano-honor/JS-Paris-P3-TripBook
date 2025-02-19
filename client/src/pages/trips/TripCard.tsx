import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TripCard.css";
import buttonback from "../../assets/images/buttonback.png";
import type { Trip } from "../../types/type";

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
			<header className="tripCardContainer-title">
				<h1 className="tripCardContainer-tripTitle">{trip?.name}</h1>
			</header>
			<main>
				<div className="tripCardContainer-images">
					<div className="tripCardContainer-imageWrapper">
						<img
							src={
								trip?.photo?.includes("http")
									? trip.photo
									: `http://localhost:3310/upload/${trip?.photo}`
							}
							alt={`nom : ${trip?.name}`}
							className="tripCardContainer-tripImage"
						/>
					</div>
				</div>
				<div className="tripCardContainer-info">
					<div className="tripCardContainer-calendar">
						<h1 className="tripCardContainer-datesTitle">
							<u>Dates:</u>
						</h1>
						<h2 className="tripCardContainer-dates">{`${formattedStartDate} to ${formattedEndDate}`}</h2>
					</div>
					<div className="tripCardContainer-description">
						<h1 className="tripCardContainer-descriptionTitle">
							Description :
						</h1>
						<p className="tripCardContainer-descriptionText">
							{trip?.description}
						</p>
					</div>
					<div className="tripCardContainer-backButtonWrapper">
						<img
							src={buttonback}
							alt="back"
							className="tripCardContainer-backButton"
							onKeyDown={handleNavigateBack}
							onClick={handleNavigateBack}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
export default TripCard;
