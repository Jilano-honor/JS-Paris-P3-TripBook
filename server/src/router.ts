import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import travelActions from "./modules/Travel/travelActions";
import travelServices from "./modules/Travel/travelServices";
router.post("/api/travels", travelServices.validateTrip, travelActions.add);
import filtertagAction from "./modules/FilterTag/filtertagAction";

router.get("/api/travels/tag/:id", filtertagAction.read);
router.get("/api/travels/tag/theme/:id", filtertagAction.readTags);
router.get("/api/travels", filtertagAction.browse);
// Define item-related routes

import countriesActions from "./modules/Country/countriesActions";
router.get("/api/countries", countriesActions.browseCountries);
/* ************************************************************************* */

export default router;
