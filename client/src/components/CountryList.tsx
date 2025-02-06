import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CountryList.css";

import type Country from "../types/Country";

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
	} catch (err) {}
};
interface Trip {
	flag: string;
	id_country: number;
	name: string;
}

interface CountryListProps {
	trips: Trip[];
	currentPage: number;
	setCurrentPage: (pageNumber: number) => void;
}

function CountryList({ trips, currentPage, setCurrentPage }: CountryListProps) {
	const tripList = trips || [];
	const itemsPerPage = 5;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const currentItems = tripList.slice(indexOfFirstItem, indexOfLastItem);

	const totalPages = Math.ceil(tripList.length / itemsPerPage);

	const paginate = (pageNumber: number) => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber);
		}
	};

	const [pageInput, setPageInput] = useState<number>(currentPage);

	const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (!Number.isNaN(value) && value >= 1 && value <= totalPages) {
			setPageInput(value);
		}
	};

	const goToPage = () => {
		paginate(pageInput);
	};

	const navigate = useNavigate();
	const handleCountryDetails = async (country: Trip) => {
		try {
			const countryDetails = await fetchCountryById(country.id_country);

			if (countryDetails) {
				const countryData: Country = {
					id_country: country.id_country,
					country_name: country.name,
					name: countryDetails[0]?.name || "",
					flag: country.flag,
					tag_id: countryDetails[0]?.tag_id || 0,
					tag_name: countryDetails[0]?.tag_name || "",
					tag_photo: countryDetails[0]?.tag_photo || "",
					trip: countryDetails[0]?.trip || [],
				};
				navigate(`/countries/${country.name}`, { state: countryData });
			}
		} catch (err) {}
	};

	return (
		<div className="tripSearchList">
			{currentItems.length > 0 ? (
				<ul className="tripSearchListCountry">
					{currentItems.map((trip) => (
						<li key={trip.id_country}>
							<button
								type="button"
								className="tripSearchListCountryBox"
								onClick={() => handleCountryDetails(trip)}
							>
								<img src={trip.flag} alt="flag" />
								<div>{trip.name}</div>
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>Aucun voyage disponible.</p>
			)}

			<div className="tripSearchButtonPage">
				<button
					className="tripSearchButtonPageDown"
					type="button"
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Précédent
				</button>
				<span>
					{currentPage} sur {totalPages}
				</span>
				<button
					className="tripSearchButtonPageUp"
					type="button"
					onClick={() => paginate(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Suivant
				</button>

				<div className="tripSearchGoToPage">
					<input
						type="number"
						value={pageInput}
						onChange={handlePageInputChange}
						min={1}
						max={totalPages}
					/>
					<button type="button" onClick={goToPage}>
						Aller à la page
					</button>
				</div>
			</div>
		</div>
	);
}

export default CountryList;
