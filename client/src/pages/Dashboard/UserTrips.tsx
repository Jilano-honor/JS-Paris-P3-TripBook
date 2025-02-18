import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserTrips.css";
import type { Trip } from "../../types/type";

function UserTrips() {
	const navigate = useNavigate();
	const { id } = useParams<string>();
	const [trips, setTrips] = useState([]);
	useEffect(() => {
		const getTrips = async () => {
			try {
				const result = await fetch(
					`${import.meta.env.VITE_API_URL}/api/user/${id}/trips`,
					{
						method: "GET",
						headers: { "content-type": "application/json" },
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

	return (
		<div className="user-trips-section">
			<h1>Mes voyages:</h1>
			<div className="user-trips-container">
				{trips.map((trip: Trip) => (
					<div key={trip.id_trip} className="user-trip-card">
						<img
							onClick={() => navigate(`/trips/${trip.id_trip}`)}
							onKeyDown={(e) =>
								e.key === "Enter" && navigate(`/trips/${trip.id_trip}`)
							}
							src={`.././flags/${trip?.flag}.png`}
							alt="user-drapeau"
							className="user-trip-flag"
						/>
					</div>
				))}
			</div>

			<button className="edit-trips-button" type="button">
				Modifier un voyage
			</button>
		</div>
	);
}
export default UserTrips;
