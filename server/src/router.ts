import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

/*router.get("/api/Theme/:id/Tags/:id/Coutries/Country/:id", CountryActions.browse);*/
/*router.get("/api/Theme/:id/Tags/:id/Coutries", CountriesActions.browse);*/
/*router.get("/api/Theme", ThemeActions.browse);*/

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
