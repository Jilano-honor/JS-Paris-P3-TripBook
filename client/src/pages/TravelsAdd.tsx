import "./TravelsAdd.css";
import DragAndDrop from "../components/DragAndDrop";
function TravelsAdd() {
	return (
		<>
			<header className="AddTrip1Header">
				<h1>Ajoute ta photo de voyage</h1>
			</header>
			<DragAndDrop />
			<div className="AddTrip1BlockNextAndBackButton">
				<button className="AddTrip1NextButton" type="button">
					Suivant
				</button>
			</div>
		</>
	);
}

export default TravelsAdd;
