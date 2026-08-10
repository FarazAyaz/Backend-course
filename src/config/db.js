import "./env.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

const connect = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    await prisma.$disconnect();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
};

export { prisma, connect, disconnect };