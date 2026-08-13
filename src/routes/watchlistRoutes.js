import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("WATCHLIST ROUTE HIT:", req.method, req.originalUrl);
  next();
});

router.post("/", authMiddleware, addToWatchlist);
router.delete("/:id", authMiddleware, removeFromWatchlist);

export default router;