import { useState } from "react";
interface Result {
	id_country: number;
	name: string;
}
function TravelSearch() {
	const [results] = useState<Result[]>([]);
	const [error] = useState("");
	const [isDropdownVisible, setDropdownVisible] = useState(true);
	const [search, setSearch] = useState("");
	return (
		<>
			<div>
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
					{isDropdownVisible && (
						<ul className="list-country-search">
							{results.length > 0
								? results.map((country) => (
										<li key={country.id_country}>
											<button type="button" onClick={() => {}}>
												{country.name}
											</button>
										</li>
									))
								: search.trim() !== "" && <p>No countries found.</p>}
						</ul>
					)}
				</div>
			</div>
		</>
	);
}
export default TravelSearch;
