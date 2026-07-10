import express from 'express';
import { env } from './env.js';
import rootRouter from './routes/index.js';

const app = express();
app.use(express.json());

app.use('/api/v1', rootRouter);

app.listen(env.PORT, () => { console.log(`backend for ai-worker is live @${env.PORT}.`)});

app.get('/', async (req, res) => {
    return res.json({ status: 200, msg: 'ai-workers-backend is healthy.' });
});