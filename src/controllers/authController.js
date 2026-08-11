import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// ================= REGISTER =================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (userExists) {
            return res.status(400).json({
                error: "User already exists with this email",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT after user is created
        const token = generateToken(user.id, res);

        return res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Something went wrong",
        });
    }
};


// ================= LOGIN =================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(400).json({
                error: "User does not exist with this email",
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                error: "Invalid email or password",
            });
        }

        // Generate JWT
        const token = generateToken(user.id, res);

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Something went wrong",
        });
    }
};

const logout = (req, res) => {
    res.cookie("jwt", {
        httpOnly: true,
        expires: new Date(0), // Set the cookie to expire immediately
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
}  


export { register, login, logout }

