import dotenv from 'dotenv';
dotenv.config();

const required = ["PORT", "DB_URL"] as const;
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
    console.error(`Missing required env vars: ${missing.join(", ")}`);
    process.exit(1);
}

export const env = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL
}