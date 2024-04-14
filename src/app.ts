import express, { Express, Request, Response } from 'express';
import URLRouter from './routes/URLRouter';
import mongoose from 'mongoose';
const app: Express = express();
const port = 7000;

app.use(express.json());

app.use('/url', URLRouter);
mongoose.connect(process.env.MONGO_CONNECTION as string).then(() => {
  console.log('Connected to database');
});
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
