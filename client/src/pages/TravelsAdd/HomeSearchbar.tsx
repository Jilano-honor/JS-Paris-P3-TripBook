import { useEffect, useState } from "react";

interface Country {
	id_country: number;
	name: string;
	flags: string;
	tag_id: number;
}

function HomeSearchbar() {
	const [results, setResults] = useState<Country[]>([]);
	const [error, setError] = useState("");
	const [isDropdownVisible, setDropdownVisible] = useState(true);
	const [search, setSearch] = useState("");

	// Fetch country details by ID
	const fetchCountryById = async (id: number) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/countries/${id}`,
			);

			if (!response.ok) {
				throw new Error("An error occurred while fetching country details.");
			}

			const data = await response.json();

			setResults([data]); // Store single country result in an array
			setError("");
		} catch (err) {
			console.error("Error fetching country details:", err);
			setError("An error occurred while fetching country details.");
		}
	};

	// Fetch countries by name when the search changes
	useEffect(() => {
		if (search.trim() === "") {
			setResults([]);
			setDropdownVisible(false);
			return;
		}

		const fetchCountriesByName = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/countries?name=${search}`,
				);
				if (!response.ok) {
					throw new Error("An error occurred while searching.");
				}

				const data = await response.json();
				setResults(data.data);
				setError("");
			} catch (err) {
				console.error("Error fetching countries:", err);
				setError("An error occurred while searching for countries.");
			}
		};

		fetchCountriesByName();
	}, [search]);

	return (
		<div className="parent-container">
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
			{isDropdownVisible && results.length > 0 && (
				<ul className="list-country-search">
					{results.map((country) => (
						<li key={country.id_country}>
							<button
								type="button"
								onClick={() => {
									fetchCountryById(country.id_country);
									setSearch(country.name);
									setDropdownVisible(false);
								}}
							>
								{country.name}
							</button>
						</li>
					))}
				</ul>
			)}
			{search.trim() !== "" && results.length === 0 && (
				<p>No countries found.</p>
			)}
		</div>
	);
}

export default HomeSearchbar;
