import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import addtravelActions from "./modules/Travel/travelActions";
import addtravelServices from "./modules/Travel/travelServices";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.post(
	"/addTravel",
	addtravelServices.validateTrip,
	addtravelActions.postTrip,
);
/* ************************************************************************* */

export default router;
