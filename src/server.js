import "./config/env.js";
import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connect, disconnect } from "./config/db.js";

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect();

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Error handling
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);

    server.close(async () => {
        await disconnect();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);

    await disconnect();
    process.exit(1);
});

process.on("SIGINT", async () => {
    console.log("SIGINT signal received. Closing server...");

    server.close(async () => {
        await disconnect();
        process.exit(1);
    });
});