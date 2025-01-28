import { useEffect, useState } from "react";
import CountryList from "../../components/CountryList";
import TagMenu from "../../components/TagMenu";
import Banner from "../../components/ThemeBanner";

import "./TravelSearch.css";

function TravelsSearch() {
	const [travels, setTravels] = useState([]);
	const [tags, setTags] = useState([]);
	const [activeTag, setActiveTag] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	// Charge la liste complète des voyages
	useEffect(() => {
		fetch("http://localhost:3310/api/travels")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Réseau de réponse non ok");
				}
				return response.json();
			})
			.then((data) => {
				setTravels(data);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des données :", error);
			});
	}, []);

	// Charge les tags
	useEffect(() => {
		fetch("http://localhost:3310/api/travels/tag")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Réseau de réponse non ok");
				}
				return response.json();
			})
			.then((data) => {
				setTags(data);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des tags :", error);
			});
	}, []);

	const loadFilteredTravels = (tagId: number) => {
		setCurrentPage(1);

		if (activeTag === tagId) {
			setActiveTag(null);
			fetch("http://localhost:3310/api/travels")
				.then((response) => {
					if (!response.ok) {
						throw new Error("Réseau de réponse non ok");
					}
					return response.json();
				})
				.then((data) => {
					setTravels(data);
				})
				.catch((error) => {
					console.error(
						"Erreur lors de la récupération de tous les voyages :",
						error,
					);
				});
		} else {
			setActiveTag(tagId);
			fetch(`http://localhost:3310/api/travels/tag/${tagId}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Réseau de réponse non ok");
					}
					return response.json();
				})
				.then((data) => {
					setTravels(data);
				})
				.catch((error) => {
					console.error(
						"Erreur lors de la récupération des voyages filtrés :",
						error,
					);
				});
		}
	};

	return (
		<>
			<Banner />
			<TagMenu
				tags={tags}
				activeTag={activeTag}
				onTagClick={loadFilteredTravels}
			/>
			<CountryList
				travels={travels}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
}

export default TravelsSearch;
