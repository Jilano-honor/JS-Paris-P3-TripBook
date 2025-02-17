import defaultimage from "../../public/2913097.jpg";

interface BannerProps {
	theme: Theme | null;
}
interface Theme {
	name: string;
	photo: string;
}

function Banner({ theme }: BannerProps) {
	return (
		<div className="banner-container">
			{theme ? (
				<>
					<img src={theme.photo} alt={theme.name} className="banner-image" />
					<h1 className="banner-title">{theme.name}</h1>
				</>
			) : (
				<>
					<img src={defaultimage} alt="default" className="banner-image" />
					<h1 className="banner-title">Sélectionnez un thème</h1>
				</>
			)}
		</div>
	);
}

export default Banner;
