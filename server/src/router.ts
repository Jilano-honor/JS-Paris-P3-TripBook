import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import travelActions from "./modules/Travel/travelActions";
import travelServices from "./modules/Travel/travelServices";
router.post("/api/travels", travelServices.validateTrip, travelActions.add);
router.get("/api/travels", travelActions.browseCountry);

import filtertagAction from "./modules/FilterTag/TagAction";
router.get("/api/tag/theme/:id", filtertagAction.readTags);
router.get("/api/travels/countries/:country_id", travelActions.browseAll);
router.get("/api/travels/:id_trip", travelActions.browse);
// Define item-related routes

import countriesActions from "./modules/Country/countriesActions";
router.get("/api/countries", countriesActions.browseCountries);
router.get("/api/travels/tag/:id", countriesActions.read);
/* ************************************************************************* */

export default router;
