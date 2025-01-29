import image from "../assets/images/sustainable-travel-concept.jpg";
function Banner() {
	return (
		<div className="banner-container">
			<img src={image} alt="Aventure et Nature" className="banner-image" />
			<h1 className="banner-title">Aventure et Nature</h1>
		</div>
	);
}

export default Banner;
