import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/welcome-message', (req, res) => {
  res.send('this is a welcome message');
});

export default app;
