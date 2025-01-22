import { useEffect, useState } from "react";
const CountrySearchBar = ({
	onCountrySelect,
}: { onCountrySelect: (id: number) => void }) => {
	const [search, setSearch] = useState("");
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [results, setResults] = useState<any[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		if (search.trim() === "") {
			setResults([]);
			return;
		}

		const fetchCountries = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/countries/search`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ search }),
					},
				);

				if (!response.ok) {
					throw new Error("An error occurred while searching.");
				}

				const data = await response.json();
				setResults(data.data);
				setError("");
			} catch (err) {
				console.error("Erreur lors du fetch:", err);
				setError("An error occurred while searching for countries.");
			}
		};

		fetchCountries();
	}, [search]);

	return (
		<div>
			<input
				type="text"
				id="Searchbar"
				placeholder="Search for a country"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<ul>
				{results.length > 0 ? (
					results.map((country) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<li
							key={country.id_country}
							onClick={() => onCountrySelect(country.id_country)} // Appeler la fonction de sélection
						>
							{country.name}
						</li>
					))
				) : (
					<p>No countries found.</p>
				)}
			</ul>
		</div>
	);
};

export default CountrySearchBar;
