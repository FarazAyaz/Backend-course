import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware reached");

    let token;

    // Check Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Otherwise check JWT cookie
    else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    // No token
    if (!token) {
        return res.status(401).json({
            error: "Not Authorized, No token provided",
        });
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!user) {
            return res.status(401).json({
                error: "User no longer exists",
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (err) {
        console.error("JWT error:", err);

        return res.status(401).json({
            error: "Not Authorized, Token failed",
        });
    }
};

export default authMiddleware;