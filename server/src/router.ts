import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import travelActions from "./modules/Travel/travelActions";
import travelServices from "./modules/Travel/travelServices";
router.post("/api/travels", travelServices.validateTrip, travelActions.add);
router.get("/api/travels", travelActions.browse);

import filtertagAction from "./modules/FilterTag/TagAction";
router.get("/api/tag/theme/:id", filtertagAction.readTags);

import ThemeAction from "./modules/FilterTag/ThemeAction";
router.get("/api/theme", ThemeAction.readthemes);
// Define item-related routes

import countriesActions from "./modules/Country/countriesActions";
router.get("/api/countries", countriesActions.browseCountries);
router.get("/api/travels/tag/:id", countriesActions.read);
/* ************************************************************************* */

export default router;
