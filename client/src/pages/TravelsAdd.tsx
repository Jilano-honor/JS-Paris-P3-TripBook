import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DragAndDrop from "../components/DragAndDrop";

const TravelsAdd = () => {
	const [tripName, setTripName] = useState("");
	const [step, setStep] = useState(1);
	const [tripDescription, setTripDescription] = useState("");
	const [search, setSearch] = useState(""); // Pays
	const [startAt, setStartAt] = useState(""); // Date de début
	const [endAt, setEndAt] = useState(""); // Date de fin
	const [tripImage, setTripImage] = useState("");
	const navigate = useNavigate();

	const createTrip = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		try {
			const result = await fetch(
				`${import.meta.env.VITE_API_URL}/api/addTravel`,
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						name: tripName,
						description: tripDescription,
						start_at: startAt,
						end_at: endAt,
						photo: tripImage,
						user_id: 94,
						country_id: 99,
					}),
				},
			);

			if (result.status === 201) {
				navigate("/profile");
			}
		} catch (error) {
			console.error(error);
		}
	};
	// console.log(tripName, tripDescription, startAt, endAt, tripImage);
	return (
		<div>
			{step === 1 && (
				<>
					<header className="AddTrip1Header">
						<h1>Ajoute ta photo de voyage</h1>
					</header>
					<DragAndDrop />
					<div className="AddTrip1BlockNextAndBackButton">
						<button
							className="AddTrip1NextButton"
							type="button"
							onClick={() => setStep(2)}
						>
							Suivant
						</button>
					</div>
				</>
			)}
			{step === 2 && (
				<div>
					<h1>Quel Pays avez-vous visité ?</h1>
					<input
						type="text"
						id="Searchbar"
						placeholder="Rechercher un pays"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
					<h1>Sur quelle période ?</h1>
					<form>
						<label>
							Start_at:
							<input
								type="date"
								name="travel-start"
								min="1950-04-01"
								max="3000-12-31"
								required
								value={startAt}
								onChange={(event) => setStartAt(event.target.value)}
							/>
						</label>
					</form>
					<form>
						<label>
							End_at:
							<input
								type="date"
								name="travel-end"
								min="1950-04-01"
								max="3000-12-31"
								required
								value={endAt}
								onChange={(event) => setEndAt(event.target.value)}
							/>
						</label>
					</form>
					<form>
						<label>
							<input
								type="text"
								id="image"
								placeholder="url d'image"
								value={tripImage}
								onChange={(event) => setTripImage(event.target.value)}
							/>
						</label>
					</form>
					<button type="button" onClick={() => setStep(1)}>
						Retour
					</button>
					<button type="button" onClick={() => setStep(3)}>
						Suivant
					</button>
				</div>
			)}
			{step === 3 && (
				<>
					<h1>Sous quel nom voulez-vous poster votre voyage ?</h1>
					<input
						type="text"
						placeholder="Nom du voyage"
						value={tripName}
						onChange={(e) => setTripName(e.target.value)}
					/>
					<h2>Partagez-nous les détails de votre voyage</h2>
					<textarea
						placeholder="Description du voyage"
						value={tripDescription}
						onChange={(e) => setTripDescription(e.target.value)}
					/>
					<button type="button" onClick={() => setStep(2)}>
						Retour
					</button>
					<button type="button" onClick={createTrip}>
						Valider le formulaire
					</button>
				</>
			)}
		</div>
	);
};
export default TravelsAdd;
