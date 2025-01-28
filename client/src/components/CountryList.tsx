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

	return (
		<div className="TravelSearchList">
			{currentItems.length > 0 ? (
				<ul className="TravelSearchListCountry">
					{currentItems.map((travel) => (
						<li key={travel.id_country} className="TravelSearchListCountryBox">
							<div>{travel.flag}</div>
							<div>{travel.name}</div>
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
		</div>
	);
}

export default CountryList;
