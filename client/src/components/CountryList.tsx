import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CountryList.css";

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

	// Function to handle the navigation to the country details page
	const handleCountryDetails = (country: Trip) => {
		// Navigate using the country ID in the URL (e.g., /countries/:id_country)
		navigate(`/countries/${country.id_country}`);
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
								onClick={() => handleCountryDetails(trip)} // Trigger navigation with ID
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
