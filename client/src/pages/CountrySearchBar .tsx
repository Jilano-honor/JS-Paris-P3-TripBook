import { useEffect, useState } from "react";

const CountrySearchBar = () => {
	const [search, setSearch] = useState(""); // Valeur de la recherche
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [results, setResults] = useState<any[]>([]); // Résultats de la recherche
	const [error, setError] = useState(""); // Gestion des erreurs

	useEffect(() => {
		// Si le champ de recherche est vide, ne rien faire
		if (search.trim() === "") {
			setResults([]);
			return;
		}

		// Fonction pour récupérer les données depuis l'API
		const fetchCountries = async () => {
			try {
				// Envoi de la requête POST
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/countries/search`,
					{
						method: "POST", // Utilisation de POST pour envoyer des paramètres dans le corps de la requête
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ search }), // Envoi du paramètre de recherche
					},
				);

				// Si la requête échoue
				if (!response.ok) {
					throw new Error("An error occurred while searching.");
				}

				const data = await response.json(); // Afficher les données reçues
				setResults(data.data); // Stockage des résultats de l'API
				setError(""); // Réinitialisation de l'erreur si la recherche réussit
			} catch (err) {
				console.error("Erreur lors du fetch:", err); // Afficher l'erreur dans la console
				setError("An error occurred while searching for countries.");
			}
		};

		// Appel de la fonction de recherche après chaque modification de la valeur de recherche
		fetchCountries();
	}, [search]); // Re-exécute la recherche à chaque changement de la valeur "search"

	return (
		<div>
			<input
				type="text"
				id="Searchbar"
				placeholder="Search for a country"
				value={search}
				onChange={(e) => setSearch(e.target.value)} // Mise à jour du search state
			/>
			{error && <p style={{ color: "red" }}>{error}</p>}{" "}
			{/* Affichage des erreurs */}
			<ul>
				{results.length > 0 ? (
					results.map((country) => {
						return <li key={country.id_country}>{country.name}</li>; // Affichage des résultats de recherche
					})
				) : (
					<p>No countries found.</p> // Si aucun pays n'est trouvé
				)}
			</ul>
		</div>
	);
};

export default CountrySearchBar;
