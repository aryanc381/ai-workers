import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    BCRYPT_SALT: process.env.BCRYPT_SALT
}