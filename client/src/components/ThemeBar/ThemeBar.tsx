import { useNavigate } from "react-router-dom";
import "./ThemeBar.css";

interface Theme {
	id_theme: string;
	name: string;
	photo: string;
}

interface ThemebarProps {
	themes: Theme[];
}

function Themebar({ themes }: ThemebarProps) {
	const navigate = useNavigate();

	return (
		<div className="homelisttheme">
			{themes.length > 0 ? (
				themes.map((theme) => (
					<button
						className="HomeThemeButton"
						type="button"
						key={theme.id_theme}
						onClick={() =>
							navigate("/Trips", { state: { themeId: theme.id_theme } })
						}
					>
						{theme.name}
					</button>
				))
			) : (
				<p>Aucun thème disponible.</p>
			)}
		</div>
	);
}

export default Themebar;
