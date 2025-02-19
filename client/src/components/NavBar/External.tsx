import "./External.css";

function External() {
	const links = [
		{
			category: "Billets d'Avion ✈️",
			sites: [
				{ name: "Skyscanner", url: "https://www.skyscanner.com/" },
				{ name: "Google Flights", url: "https://www.google.com/flights" },
				{ name: "Expedia", url: "https://www.expedia.com/" },
				{ name: "Kayak", url: "https://www.kayak.com/" },
			],
		},
		{
			category: "Billets de Bus 🚌",
			sites: [
				{ name: "FlixBus", url: "https://www.flixbus.com/" },
				{ name: "Omio", url: "https://www.omio.com/" },
				{ name: "BlaBlaCar Bus", url: "https://www.blablacar.fr/bus" },
			],
		},
		{
			category: "Billets de Train 🚆",
			sites: [
				{ name: "Trainline", url: "https://www.thetrainline.com/" },
				{ name: "SNCF", url: "https://www.sncf-connect.com/" },
				{ name: "Deutsche Bahn", url: "https://www.bahn.com/en" },
				{ name: "Amtrak", url: "https://www.amtrak.com/" },
			],
		},
		{
			category: "Hôtels & Hébergements 🏨",
			sites: [
				{ name: "Booking.com", url: "https://www.booking.com/" },
				{ name: "Hotels.com", url: "https://www.hotels.com/" },
				{ name: "Expedia Hôtels", url: "https://www.expedia.com/Hotels" },
				{ name: "Airbnb", url: "https://www.airbnb.com/" },
			],
		},
	];

	return (
		<div className="ext-container">
			<h1 className="ext-title">Réservations de Voyages</h1>
			{links.map((section) => (
				<div key={section.category} className="section">
					<h2 className="section-title">{section.category}</h2>
					<div className="link-grid">
						{section.sites.map((site) => (
							<a
								key={site.name}
								href={site.url}
								target="_blank"
								rel="noopener noreferrer"
								className="link"
							>
								{site.name}
							</a>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default External;
