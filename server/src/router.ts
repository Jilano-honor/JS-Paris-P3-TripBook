import express from "express";

const router = express.Router();

import authService from "./modules/Auth/authService";
import countriesActions from "./modules/Country/countriesActions";
import travelActions from "./modules/Travel/travelActions";
import travelRepository from "./modules/Travel/travelRepository";
import travelServices from "./modules/Travel/travelServices";
import userActions from "./modules/User/userActions";

router.post("/api/travels", travelServices.validateTrip, travelActions.add);
router.get("/api/travels/:id", travelActions.getTrip);

router.post("/api/users", authService.hash, userActions.add);

router.get("/api/countries", countriesActions.browseCountries);

export default router;
