import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelsCountrySearchbar from "./TravelsCountrySearchbar";
import "./TravelsAdd.css";
const TravelsAdd = () => {
	const [tripName, setTripName] = useState("");
	const [step, setStep] = useState(1);
	const [tripDescription, setTripDescription] = useState("");
	const [startAt, setStartAt] = useState("");
	const [endAt, setEndAt] = useState("");
	const [tripImage, setTripImage] = useState("");
	const [countryId, setCountryId] = useState<number>();
	const [search, setSearch] = useState("");
	const [error, setError] = useState<string>("");

	const navigate = useNavigate();

	const isValidImageUrl = (url: string) => {
		return url.endsWith(".png");
	};

	const validateStep3 = () => {
		if (!tripName.trim() || !tripDescription.trim()) {
			setError("Veuillez remplir tous les champs du formulaire.");
			return false;
		}
		setError("");
		return true;
	};

	const validateStep2 = () => {
		if (!startAt || !endAt || !countryId) {
			setError(
				"Tous les champs doivent être remplis pour passer à l'étape suivante.",
			);
			return false;
		}
		if (new Date(endAt) < new Date(startAt)) {
			setError(
				"La date de fin ne peut pas être antérieure à la date de début.",
			);
			return false;
		}
		setError("");
		return true;
	};

	const createTrip = async () => {
		try {
			const result = await fetch(
				`${import.meta.env.VITE_API_URL}/api/add/travel`,
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
						user_id: 1,
						country_id: countryId,
					}),
				},
			);

			if (result.status === 201) {
				navigate("/profile");
			}
		} catch (error) {
			console.error(error);
			setError("Une erreur s'est produite lors de la création du voyage.");
		}
	};

	return (
		<div>
			{step === 1 && (
				<div className="step1-container-addtrip">
					<header className="header-step1-addtrip">
						<h1 className="Name-h1-step1">Ajoute ta photo de voyage</h1>
						<form>
							<label>
								<input
									type="text"
									id="image"
									placeholder="URL d'image"
									value={tripImage}
									onChange={(event) => setTripImage(event.target.value)}
								/>
							</label>
						</form>
					</header>
					{error && <p>{error}</p>}
					<div className="AddTrip1BlockNextAndBackButton">
						<button
							className="AddTrip1NextButton"
							type="button"
							onClick={() => {
								if (isValidImageUrl(tripImage)) {
									setError("");
									setStep(2);
								} else {
									setError("L'URL de l'image doit se terminer par .png .");
								}
							}}
						>
							Suivant
						</button>
					</div>
				</div>
			)}

			{step === 2 && (
				<div className="step2-container-addtrip">
					<h1 className="name-h1-step2-first">
						Quel pays souhaité vous visitez ?
					</h1>
					<TravelsCountrySearchbar
						search={search}
						setSearch={setSearch}
						onCountrySelect={(id) => setCountryId(id)}
					/>
					<h1 className="name-h1-step2-second">Sur quelle période ?</h1>
					<article className="step2-container-start-end-at">
						<form>
							<label className="start-at-step2">
								<h2 className="start-end-h2-name">Start date:</h2>
								<input
									className="start-at-step2"
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
							<label className="end-at-step2">
								<h2 className="start-end-h2-name">End date:</h2>
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
					</article>
					{error && <p>{error}</p>}
					<div>
						<button
							className="button-step2-back"
							type="button"
							onClick={() => setStep(1)}
						>
							Retour
						</button>
						<button
							className="button-step2-next"
							type="button"
							onClick={() => {
								if (validateStep2()) setStep(3);
							}}
						>
							Suivant
						</button>
					</div>
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
						cols={60}
						rows={15}
						placeholder="Description du voyage"
						value={tripDescription}
						onChange={(e) => setTripDescription(e.target.value)}
					/>
					{error && <p>{error}</p>}
					<div>
						<button type="button" onClick={() => setStep(2)}>
							Retour
						</button>
						<button
							type="button"
							onClick={() => {
								if (validateStep3()) createTrip();
							}}
						>
							Valider le formulaire
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default TravelsAdd;
