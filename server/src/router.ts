import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import tripActions from "./modules/Trip/tripActions";
import tripServices from "./modules/Trip/tripServices";
router.post("/api/trips", tripServices.validateTrip, tripActions.add);
router.get("/api/trips", tripActions.browseCountry);

import filtertagAction from "./modules/FilterTag/TagAction";
router.get("/api/tag/theme/:id", filtertagAction.readTags);
router.get("/api/trips/countries/:country_id", tripActions.browseAll);
router.get("/api/trips/:id_trip", tripActions.browse);
// Define item-related routes

import countriesActions from "./modules/Country/countriesActions";
router.get("/api/countries", countriesActions.browseCountries);
router.get("/api/trips/tag/:id", countriesActions.read);
/* ************************************************************************* */

export default router;
