import express from "express";

const router = express.Router();

import authService from "./modules/Auth/authService";
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import tripActions from "./modules/Trip/tripActions";
import tripServices from "./modules/Trip/tripServices";
router.post("/api/trips", tripServices.validateTrip, tripActions.add);
router.get("/api/trips", tripActions.browseAll);

import filtertagAction from "./modules/FilterTag/TagAction";
router.get("/api/tag/theme/:id", filtertagAction.readTags);
router.get("/api/countries/:country_id/trips", tripActions.browseAllByCountry);
router.get("/api/trips/:id_trip", tripActions.browse);
// Define item-related routes

import countriesActions from "./modules/Country/countriesActions";
import userActions from "./modules/User/userActions";

router.post("/api/trips", tripServices.validateTrip, tripActions.add);

router.post("/api/users", authService.hash, userActions.add);

router.get("/api/countries", countriesActions.browseCountries);
router.get("/api/trips/tag/:id", countriesActions.read);
/* ************************************************************************* */

export default router;
