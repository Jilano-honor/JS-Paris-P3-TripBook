import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountryList from "../../components/CountryList";
import TagMenu from "../../components/TagMenu";
import Banner from "../../components/ThemeBanner";
import "./TripsSearch.css";
import HomeButton from "../../assets/images/Icon_buton_back.png";
import Themebar from "../../components/ThemeBar/ThemeBar";

const fetchData = async (url: string | URL | Request) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Réseau de réponse non ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Erreur lors de la récupération des données :", error);
		return null;
	}
};

function TripsSearch() {
	const [trips, setTrips] = useState([]);
	const [tags, setTags] = useState([]);
	const [activeTag, setActiveTag] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [themes, setThemes] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();
	const themeId = location.state?.themeId || 3;

	useEffect(() => {
		const getTrips = async () => {
			const data = await fetchData(
				`http://localhost:3310/api/theme/countries/${themeId}`,
			);
			if (data) {
				setTrips(data);
			}
		};
		getTrips();
	}, [themeId]);

	useEffect(() => {
		const getTags = async () => {
			const data = await fetchData(
				`http://localhost:3310/api/tag/theme/${themeId}`,
			);
			if (data) {
				setTags(data);
			}
		};
		getTags();
	}, [themeId]);

	useEffect(() => {
		const getThemes = async () => {
			const data = await fetchData("http://localhost:3310/api/theme");
			if (data) {
				setThemes(data.theme);
			}
		};
		getThemes();
	}, []);

	const loadFilteredTrips = (tagId: number) => {
		setCurrentPage(1);

		if (activeTag === tagId) {
			setActiveTag(null);
			fetchTrips(themeId);
		} else {
			setActiveTag(tagId);
			fetchFilteredTrips(tagId);
		}
	};

	const fetchFilteredTrips = async (tagId: number) => {
		const data = await fetchData(
			`http://localhost:3310/api/trips/tag/${tagId}`,
		);
		if (data) {
			setTrips(data);
		}
	};

	const fetchTrips = async (themeId: number) => {
		const data = await fetchData(
			`http://localhost:3310/api/theme/countries/${themeId}`,
		);
		if (data) {
			setTrips(data);
		}
	};

	const goHome = () => {
		navigate("/");
	};

	return (
		<div className="TripSearch">
			<Banner />
			<Themebar themes={themes} />
			<TagMenu
				tags={tags}
				activeTag={activeTag}
				onTagClick={(tagId) => loadFilteredTrips(tagId)}
			/>
			<CountryList
				trips={trips}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
			<button type="button" className="GoHomeButton" onClick={goHome}>
				<img src={HomeButton} alt="home button" />
			</button>
		</div>
	);
}

export default TripsSearch;
