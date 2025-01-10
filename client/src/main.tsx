// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./variable.css";
import "./reset.css";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import CountryCard from "./pages/CountryCard";
import CountryList from "./pages/CountryList";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profil from "./pages/Profil";
import SignIn from "./pages/SignIn";

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
        path: "/CountryCard",
        element: <CountryCard />,
      },
      {
        path: "/CountryList",
        element: <CountryList />,
      },
      {
        path: "/Profil",
        element: <Profil />,
      },
      {
        path: "/LogIn",
        element: <LogIn />,
      },
      {
        path: "/SignIn",
        element: <SignIn />,
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
