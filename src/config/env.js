import "dotenv/config";

console.log("JWT_SECRET loaded:", Boolean(process.env.JWT_SECRET));
console.log("EXPIRES_IN loaded:", process.env.EXPIRES_IN || "<missing>");