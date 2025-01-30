// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/global.css";
import "./assets/reset.css";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import Country from "./pages/Country/Country";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import TripCard from "./pages/Trips/TripCard";
import TripsSearch from "./pages/TripSearch/TripsSearch";
import TripsAdd from "./pages/Trips/TripsAdd";

/* ************************************************************************* */
const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/trips",
				element: <TripsSearch />,
			},
			{
				path: "/countries/:id",
				element: <Country />,
			},
			{
				path: "/trips/:id",
				element: <TripCard />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/login",
				element: <LogIn />,
			},
			{
				path: "/signin",
				element: <SignIn />,
			},
			{
				path: "/trips/add",
				element: <TripsAdd />,
			},
		],
	},
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
	throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
