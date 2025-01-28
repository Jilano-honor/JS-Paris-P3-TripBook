import { useState } from "react";

interface Travel {
	flag: string;
	id_country: number;
	name: string;
}

interface CountryListProps {
	travels: Travel[];
	currentPage: number;
	setCurrentPage: (pageNumber: number) => void;
}

function CountryList({
	travels,
	currentPage,
	setCurrentPage,
}: CountryListProps) {
	const travelList = travels || [];
	const itemsPerPage = 5;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const currentItems = travelList.slice(indexOfFirstItem, indexOfLastItem);

	const totalPages = Math.ceil(travelList.length / itemsPerPage);

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

	return (
		<div className="TravelSearchList">
			{currentItems.length > 0 ? (
				<ul className="TravelSearchListCountry">
					{currentItems.map((travel) => (
						<li key={travel.id_country}>
							<button type="button" className="TravelSearchListCountryBox">
								<img src={travel.flag} alt="flag" />
								<div>{travel.name}</div>
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>Aucun voyage disponible.</p>
			)}

			<div className="TravelSearchButtonPage">
				<button
					className="TravelSearchButtonPageDown"
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
					className="TravelSearchButtonPageUp"
					type="button"
					onClick={() => paginate(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Suivant
				</button>
			</div>

			<div className="TravelSearchGoToPage">
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
	);
}

export default CountryList;
