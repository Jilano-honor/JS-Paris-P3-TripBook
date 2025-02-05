import express from "express";
import authActions from "./modules/Auth/authActions";
import authService from "./modules/Auth/authService";
import countriesActions from "./modules/Country/countriesActions";
import filtertagAction from "./modules/FilterTag/TagAction";
import ThemeAction from "./modules/FilterTag/ThemeAction";
import tripActions from "./modules/Trip/tripActions";
import tripServices from "./modules/Trip/tripServices";
import userActions from "./modules/User/userActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.get("/api/trips/:id", tripActions.browseAll);
router.get("/api/tag/theme/:id", filtertagAction.readTags);
router.get("/api/theme", ThemeAction.readthemes);
router.get("/api/countries/:country_id/trips", tripActions.browseAllByCountry);
router.get("/api/trips/:id_trip", tripActions.browse);
router.post("/api/users", authService.hash, userActions.add);
router.post("/api/login", authActions.login);
router.get("/api/countries", countriesActions.browseCountries);
router.get("/api/trips/tag/:id", countriesActions.read);

//private routes
router.use(authService.isAuth);

/* ************************************************************************* */
export default router;
