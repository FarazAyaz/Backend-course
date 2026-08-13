import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body;

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

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

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

export const removeFromWatchlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id: req.params.id },
    });

    if (!watchlistItem) {
      return res.status(404).json({
        error: "Watchlist item not found",
      });
    }

    if (watchlistItem.userId !== req.user.id) {
      return res.status(403).json({
        error: "Not allowed to delete this watchlist item",
      });
    }

    await prisma.watchlistItem.delete({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      status: "success",
      message: "Movie removed from watchlist",
    });
  } catch (error) {
    console.error("Remove watchlist error:", error);

    return res.status(500).json({
      error: "Failed to remove watchlist item",
      details: error.message,
    });
  }
};