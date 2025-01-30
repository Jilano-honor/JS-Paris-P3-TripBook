import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import travelActions from "./modules/Travel/travelActions";
import travelServices from "./modules/Travel/travelServices";
import countriesActions from "./modules/Country/countriesActions";
import travelRepository from "./modules/Travel/travelRepository";
import userActions from "./modules/User/userActions";

router.post("/api/travels", travelServices.validateTrip, travelActions.add);
router.get("/api/travels/:id", travelActions.getTrip);

router.post("/api/users", userActions.add)

router.get("/api/countries", countriesActions.browseCountries);
/* ************************************************************************* */

export default router;
