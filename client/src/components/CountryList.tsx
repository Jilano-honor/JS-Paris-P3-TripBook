interface Travel {
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
	const itemsPerPage = 10;

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
		<div>
			<h2>Liste des voyages :</h2>
			{currentItems.length > 0 ? (
				<ul>
					{currentItems.map((travel) => (
						<li key={travel.id_country}>{travel.name}</li>
					))}
				</ul>
			) : (
				<p>Aucun voyage disponible.</p>
			)}

			<div>
				<button
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
