import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body;

    // For testing, userId can come from body.
    // Later JWT middleware ke baad req.user.id use karna.
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(401).json({
        error: "User authentication required",
      });
    }

    if (!movieId) {
      return res.status(400).json({
        error: "movieId is required",
      });
    }

    // Check if movie exists
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    // Check if movie is already in watchlist
    const existingEntry = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    if (existingEntry) {
      return res.status(400).json({
        error: "Movie already in watchlist",
      });
    }

    // Create watchlist item
    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    return res.status(201).json({
      message: "Movie added to watchlist",
      watchlistItem,
    });
  } catch (error) {
    console.error("Add to watchlist error:", error);

    return res.status(500).json({
      error: "Failed to add movie to watchlist",
      details: error.message,
    });
  }
};