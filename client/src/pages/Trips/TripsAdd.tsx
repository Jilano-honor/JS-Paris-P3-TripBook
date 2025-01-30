import { useState } from "react";

import { useNavigate } from "react-router-dom";
import buttonback from "../../assets/images/buttonback.png";
import TripsCountrySearchbar from "../../components/TripsCountrySearchbar/TripsCountrySearchbar";
import "./TripsAdd.css";

const TripsAdd = () => {
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
			const result = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`, {
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
					user_id: 3,
					country_id: countryId,
				}),
			});

			if (result.status === 201) {
				navigate("/profile");
			}
		} catch (error) {
			console.error(error);
			setError("Une erreur s'est produite lors de la création du voyage.");
		}
	};

	return (
		<section>
			{step === 1 && (
				<article className="step1-container-addtrip">
					<header className="header-step1-addtrip">
						<h1 className="Name-h1-step1">Ajoute ta photo de voyage</h1>
						<form>
							<label className="step1-search-addtrip">
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

					<div className="AddTrip1BlockNextAndBackButton">
						{error && <p className="error-allstep">{error}</p>}
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
				</article>
			)}

			{step === 2 && (
				<section className="step2-container-addtrip">
					<h1 className="name-h1">Quel pays souhaité vous visitez ?</h1>
					<TripsCountrySearchbar
						search={search}
						setSearch={setSearch}
						onCountrySelect={(id) => setCountryId(id)}
					/>
					<h1 className="name-h1">Sur quelle période ?</h1>
					<article className="step2-container-start-end-at">
						<form>
							<label className="start-at-step2">
								<h2 className="start-end-h2-name">Start date:</h2>
								<input
									className="start-at-step2"
									type="date"
									name="trip-start"
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
									name="trip-end"
									min="1950-04-01"
									max="3000-12-31"
									required
									value={endAt}
									onChange={(event) => setEndAt(event.target.value)}
								/>
							</label>
						</form>
					</article>
					{error && <p className="error-allstep ">{error}</p>}
					<article className="next-back-button-container">
						<button
							className="button-step2-back"
							type="button"
							onClick={() => setStep(1)}
						>
							<img className="img-back-button" src={buttonback} alt="Back" />
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
					</article>
				</section>
			)}

			{step === 3 && (
				<section className="step3-container-addtrip">
					<h1 className="name-h1">
						Sous quel nom voulez-vous poster votre voyage ?
					</h1>
					<input
						type="text"
						placeholder="Nom du voyage"
						value={tripName}
						onChange={(e) => setTripName(e.target.value)}
					/>
					<h1 className="name-h1">Partagez-nous les détails de votre voyage</h1>
					<textarea
						cols={80}
						rows={9}
						placeholder="Description du voyage"
						value={tripDescription}
						onChange={(e) => setTripDescription(e.target.value)}
					/>
					{error && <p className="error-allstep">{error}</p>}
					<article className="next-back-button-container">
						<button
							className="button-step2-back"
							type="button"
							onClick={() => setStep(2)}
						>
							<img className="img-back-button" src={buttonback} alt="Back" />
						</button>
						<button
							className="button-step2-next"
							type="button"
							onClick={() => {
								if (validateStep3()) createTrip();
							}}
						>
							Valider le formulaire
						</button>
					</article>
				</section>
			)}
		</section>
	);
};

export default TripsAdd;
