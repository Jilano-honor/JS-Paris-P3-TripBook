import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import travelActions from "./modules/Trip/tripActions";
import travelServices from "./modules/Trip/tripServices";
router.post("/api/travels", travelServices.validateTrip, travelActions.add);
// Define item-related routes

import countriesActions from "./modules/Country/countriesActions";
router.get("/api/countries", countriesActions.browseCountries);
router.get("/api/countries/:id", countriesActions.readCountriesById);
/* ************************************************************************* */

export default router;
