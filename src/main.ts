import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';
import logger from './logger';

const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/db';

async function bootstap() {
  try {
    await mongoose.connect(
      MONGO_URI.replace('<DB_PASSWORD>', process.env.DB_PASSWORD as string),
    );
  } catch (e) {
    logger.error('Failed to connect to the DB!');
  }

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

bootstap();
