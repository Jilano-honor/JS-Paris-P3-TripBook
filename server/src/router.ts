import express from "express";
import authActions from "./modules/Auth/authActions";
import authService from "./modules/Auth/authService";
import countriesActions from "./modules/Country/countriesActions";
import filtertagAction from "./modules/FilterTag/TagAction";
import ThemeAction from "./modules/FilterTag/ThemeAction";
import tripActions from "./modules/Trip/tripActions";
import tripServices from "./modules/Trip/tripServices";
import upload from "./modules/Upload/uploadServices";
import uploadServices from "./modules/Upload/uploadServices";
import userActions from "./modules/User/userActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

//trips and country
router.get("/api/trips/:id_trip", tripActions.browse);
router.get("/api/countries/:country_id/trips", tripActions.browseAllByCountry);
router.get("/api/countries", countriesActions.browseCountries);
router.get("/api/countries/:id", countriesActions.readCountriesById);
router.get("/api/trips/tag/:id", countriesActions.read);

//theme
router.get("/api/theme", ThemeAction.readthemes);
router.get("/api/theme/countries/:id", countriesActions.browsebytheme);
router.get("/api/tag/theme/:id", filtertagAction.readTags);

//authentification
router.post("/api/users", authService.hash, userActions.add);
router.post("/api/login", authActions.login);

//private routes
router.post(
	"/api/trips",
	upload.single("image"),
	authService.isAuth,
	tripServices.validateTrip,
	tripActions.add,
);
/* ************************************************************************* */
export default router;
