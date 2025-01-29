import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import travelActions from "./modules/Travel/travelActions";
import travelServices from "./modules/Travel/travelServices";
router.post("/api/travels", travelServices.validateTrip, travelActions.add);
router.get("/api/travels/:country_id", travelActions.browseAll);
router.get("/api/travels/country/:id_trip", travelActions.browse);
// Define item-related routes

import countriesActions from "./modules/Country/countriesActions";
router.get("/api/countries", countriesActions.browseCountries);
/* ************************************************************************* */

export default router;
