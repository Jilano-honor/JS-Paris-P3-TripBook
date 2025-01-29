import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TripCard.css";
import buttonback from "../assets/images/buttonback.png";
interface Trip {
	id_trip: number;
	name: string;
	start_at: Date;
	end_at: Date;
	description: string;
	photo: string;
	user_id: number;
	country_id: number;
}
function TripCard() {
	const [trip, setTrip] = useState<Trip>([]);
	const navigate = useNavigate();
	const [travels, setTravels] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		fetch("http://localhost:3310/api/travels")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Réseau de réponse non ok");
				}
				return response.json();
			})
			.then((data) => {
				setTravels(data);
				console.log(data);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des données :", error);
			});
	}, []);
	useEffect(() => {
		const getTrips = async () => {
			try {
				const result = await fetch(
					`${import.meta.env.VITE_API_URL}/api/travels/country/${id}`,
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
		getTrips();
	}, [id]);
	const formattedStartDate = new Date(trip.start_at).toLocaleDateString(
		"fr-FR",
	);
	const formattedEndDate = new Date(trip.end_at).toLocaleDateString("fr-FR");

	return (
		<>
			<header className="tripCard-block-title">
				<h1 className="tripCard-trip-title">{trip?.name}</h1>
			</header>
			<main>
				<div className="tripCard-image-block">
					<img
						src={trip.photo}
						alt={`nom : ${trip.name}`}
						className="tripCard-trip-image"
					/>
				</div>
				<div className="tripCard-dates-description-block">
					<h1 className="tripCard-dates">Dates</h1>
					<h2 className="tripCard-dates">{`${formattedStartDate} to ${formattedEndDate}`}</h2>
					<div className="tripCard-description-block">
						<h1 className="tripCard-description-title">Description :</h1>
						<p className="tripCard-description-text">{trip.description}</p>
						<div className="tripCard-buttonBack-block">
							<img
								src={buttonback}
								alt="back"
								className="tripCard-buttonBack"
							/>
						</div>
					</div>
				</div>
			</main>
			{/* <img src={travel.flag} alt="flag" /> */}
		</>
	);
}
export default TripCard;
