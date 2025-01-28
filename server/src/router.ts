import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import travelActions from "./modules/Travel/travelActions";
import travelServices from "./modules/Travel/travelServices";
router.post("/api/add/travel", travelServices.validateTrip, travelActions.Add);
// Define item-related routes

import countriesActions from "./modules/Country/countriesActions";
router.post("/api/countries/search", countriesActions.searchbarCountries);
/* ************************************************************************* */

export default router;
