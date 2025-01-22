import type { Request, Response } from "express";
import CountryRepository from "./CountryRepository";

const searchbarCountries = async (req: Request, res: Response) => {
	try {
		// Extraction du paramètre de recherche depuis la requête, en spécifiant le type attendu
		const { search } = req.body;

		// Validation du paramètre, avec une vérification plus stricte
		if (typeof search !== "string" || search.trim() === "") {
			res.status(400).json({
				error: "Search query is required and must be a non-empty string.",
			});
			return; // Ajoutez un return ici pour arrêter l'exécution après avoir envoyé la réponse d'erreur.
		}

		// Appel au repository pour récupérer les résultats
		const countries = await CountryRepository.searchCountries(search);

		// Envoi des résultats
		res.status(200).json({ data: countries });
	} catch (error) {
		// Gestion des erreurs
		console.error("Error in searchCountries action:", error);
		res
			.status(500)
			.json({ error: "An error occurred while searching for countries." });
	}
};

export default { searchbarCountries };
