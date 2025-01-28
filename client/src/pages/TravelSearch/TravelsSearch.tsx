import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountryList from "../../components/CountryList";
import TagMenu from "../../components/TagMenu";
import Banner from "../../components/ThemeBanner";

import "./TravelSearch.css";

import HomeButton from "../../assets/images/Icon_buton_back.png";

function TravelsSearch() {
	const [travels, setTravels] = useState([]);
	const [tags, setTags] = useState([]);
	const [activeTag, setActiveTag] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const themeId = 3;
	const navigate = useNavigate();

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

	useEffect(() => {
		fetch(`http://localhost:3310/api/travels/tag/theme/${themeId}`)
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

	const goHome = () => {
		navigate("/");
	};

	return (
		<>
			<div className="TravelSearch">
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
				<button type="button" className="GoHomeButton" onClick={goHome}>
					<img src={HomeButton} alt="home button" />
				</button>
			</div>
		</>
	);
}

export default TravelsSearch;
