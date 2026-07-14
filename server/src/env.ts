import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    BCRYPT_SALT: process.env.BCRYPT_SALT,
    LLM_API_URL: process.env.LLM_API_URL,
    LLM_MODEL: process.env.LLM_MODEL,
    LLM_API_KEY: process.env.LLM_API_KEY,
    GOOGLE_AUTH_ENDPOINT: process.env.GOOGLE_AUTH_ENDPOINT,
    GOOGLE_TOKEN_ENDPOINT: process.env.GOOGLE_TOKEN_ENDPOINT,
    GOOGLE_USERINFO_ENDPOINT: process.env.GOOGLE_USERINFO_ENDPOINT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
    FRONTEND_URL: process.env.FRONTEND_URL
}
