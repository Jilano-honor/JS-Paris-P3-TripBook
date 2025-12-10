import { Outlet, ScrollRestoration } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

function App() {
	const [user, setUser] = useState(null);
	return (
		<>
			<NavBar />
			<ScrollRestoration />
			<Outlet context={{ user, setUser }} />
			<Footer />
		</>
	);
}

export default App;
