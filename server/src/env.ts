import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    BCRYPT_SALT: process.env.BCRYPT_SALT,
    LLM_API_URL: process.env.LLM_API_URL,
    LLM_MODEL: process.env.LLM_MODEL,
    LLM_API_KEY: process.env.LLM_API_KEY
}