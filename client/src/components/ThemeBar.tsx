import { useNavigate } from "react-router-dom";

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
		<div className="HomeListTheme">
			{themes.length > 0 ? (
				themes.map((theme) => (
					<button
						className="HomeThemeButton"
						type="button"
						key={theme.id_theme}
						onClick={() =>
							navigate("/Travels", { state: { themeId: theme.id_theme } })
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
