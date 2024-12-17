import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import mongoose from 'mongoose';
import app from './app';
import logger from './logger';

const serverConfig: any = config.get('server');
const dbConfig: any = config.get('db');

const PORT = process.env.PORT || serverConfig.port;
const MONGO_URI = process.env.MONGO_URI || dbConfig.mongoUri;

async function bootstap() {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (e) {
    logger.error('Failed to connect to the DB!');
  }

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

bootstap();
