import { Outlet } from "react-router-dom";
import "./App.css";
import CountrySearchBar from "./pages/CountrySearchBar ";
import TravelsAdd from "./pages/TravelsAdd";

function App() {
	return (
		<div id="root">
			<Outlet />
		</div>
	);
}

export default App;
