import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CountryDetails {
	id_country: number;
	name: string;
	flag: string;
	tag_id: number;
	tag_name: string;
	tag_photo: string;
	trip: Trip[];
}

interface Trip {
	id_trip: number;
	countryName: string;
	flag: string;
	name: string;
	start_at: Date;
	end_at: Date;
	description: string;
	photo: string;
	user_id: number;
	country_id: number;
}

function HomeSearchbar() {
	const [results, setResults] = useState<CountryDetails[]>([]);
	const [error, setError] = useState("");
	const [isDropdownVisible, setDropdownVisible] = useState(true);
	const [search, setSearch] = useState("");

	const navigate = useNavigate();
	const handleCountryDetails = (CountryAll: CountryDetails) => {
		navigate("/countrydetails", { state: CountryAll });
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
								onClick={async () => {
									try {
										const countryDetails = await fetchCountryById(
											country.id_country,
										);

										if (countryDetails && countryDetails.length > 0) {
											const countryDetailsObj = countryDetails[0];
											setSearch(country.name);
											setDropdownVisible(false);
											handleCountryDetails(countryDetailsObj);
										}
									} catch (error) {
										console.error(
											"Erreur lors de la récupération du pays:",
											error,
										);
									}
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
