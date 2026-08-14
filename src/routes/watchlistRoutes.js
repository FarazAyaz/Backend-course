import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addtowatchlistSchema } from "../validators/watchlistValidator.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("WATCHLIST ROUTE HIT:", req.method, req.originalUrl);
  next();
});

router.post("/", validateRequest(addtowatchlistSchema), addToWatchlist);
router.delete("/:id", removeFromWatchlist);

export default router;