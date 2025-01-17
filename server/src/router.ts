import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import travelActions from "./modules/Travel/travelActions";
import travelServices from "./modules/Travel/travelServices";
// Define item-related routes

router.post("/addTravel", travelServices.validateTrip, travelActions.Add);
/* ************************************************************************* */

export default router;
