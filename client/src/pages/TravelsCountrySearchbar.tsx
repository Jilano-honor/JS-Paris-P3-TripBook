import { useEffect, useState } from "react";
import "./TravelsCountrySearchbar.css";

interface Result {
	id_country: number;
	name: string;
}

const TravelsCountrySearchbar = ({
	search,
	setSearch,
	onCountrySelect,
}: {
	search: string;
	setSearch: (value: string) => void;
	onCountrySelect: (id: number) => void;
}) => {
	const [results, setResults] = useState<Result[]>([]);
	const [error, setError] = useState("");
	const [isDropdownVisible, setDropdownVisible] = useState(true);
	useEffect(() => {
		if (search.trim() === "") {
			setResults([]);
			setDropdownVisible(true);
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
				className="step2-searchbarcountry"
				type="text"
				id="Searchbar"
				placeholder="Search for a country"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
					setDropdownVisible(true);
				}}
			/>
			{error && <p>{error}</p>}
			{isDropdownVisible && (
				<ul className="list-country-search">
					{results.length > 0
						? results.map((country) => (
								<li key={country.id_country}>
									<button
										type="button"
										onClick={() => {
											onCountrySelect(country.id_country);
											setSearch(country.name);
											setDropdownVisible(false);
										}}
									>
										{country.name}
									</button>
								</li>
							))
						: search.trim() !== "" && <p>No countries found.</p>}
				</ul>
			)}
		</div>
	);
};

export default TravelsCountrySearchbar;
