import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type Country from "../../types/Country";

function HomeSearchbar() {
	const [results, setResults] = useState<Country[]>([]);
	const [error, setError] = useState("");
	const [isDropdownVisible, setDropdownVisible] = useState(true);
	const [search, setSearch] = useState("");

	const navigate = useNavigate();
	const handleCountryDetails = (country: Country) => {
		navigate(`/countries/${country.country_name.toLocaleLowerCase()}`, {
			state: country,
		});
	};

	const fetchCountryById = async (id: number) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/countries/${id}`,
			);

			if (!response.ok) {
				throw new Error("An error occurred while fetching country details.");
			}

			const data = await response.json();
			return [data];
		} catch (err) {
			console.error("Error fetching country details:", err);
			setError("An error occurred while fetching country details.");
		}
	};

	useEffect(() => {
		if (search.trim() === "") {
			setResults([]);
			setDropdownVisible(false);
			return;
		}

		const fetchCountriesByName = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/countries?name=${search.toLocaleLowerCase()}`,
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

	const getCountry = async () => {
		try {
			const countryDetails = await fetchCountryById(results[0]?.id_country);

			if (countryDetails && countryDetails.length > 0) {
				const country = countryDetails[0];
				setSearch(country.name);
				setDropdownVisible(false);
				handleCountryDetails(country);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du pays :", error);
		}
	};

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
							<button type="button" onClick={getCountry}>
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
