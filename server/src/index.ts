import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './env.js';
import rootRouter from './routes/index.js';

const app = express();
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', rootRouter);

app.listen(env.PORT, () => { console.log(`backend for ai-worker is @${env.PORT}.`)});

app.get('/', async (req, res) => {
    return res.json({ status: 200, msg: 'ai-workers-backend is healthy.' });
});
