import { useState } from "react";

const TravelForm = () => {
	const [tripName, setTripName] = useState("");
	const [step, setStep] = useState(1);
	const [tripDescription, setTripDescription] = useState("");
	const [search, setSearch] = useState(""); // Pays
	const [startAt, setStartAt] = useState(""); // Date de début
	const [endAt, setEndAt] = useState(""); // Date de fin

	return (
		<div>
			{step === 1 && (
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
					<button type="button" onClick={() => setStep(1)}>
						Retour
					</button>
					<button type="button" onClick={() => setStep(2)}>
						Suivant
					</button>
				</div>
			)}
			{step === 2 && (
				<>
					<h1>Sous quel nom voulez-vous postez votre voyage </h1>
					<input type="text" name="Nom de Voyage" id="" />
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
					<button type="button" onClick={() => setStep(1)}>
						Retour
					</button>
					<button type="button" onClick={() => setStep(2)}>
						Valider
					</button>
				</>
			)}
		</div>
	);
};

export default TravelForm;
import "./TravelsAdd.css";
import DragAndDrop from "../components/DragAndDrop";
function TravelsAdd() {
	return (
		<>
			<header className="AddTrip1Header">
				<h1>Ajoute ta photo de voyage</h1>
			</header>
			<DragAndDrop />
			<div className="AddTrip1BlockNextAndBackButton">
				<button className="AddTrip1NextButton" type="button">
					Suivant
				</button>
			</div>
		</>
	);
}

export default TravelsAdd;
