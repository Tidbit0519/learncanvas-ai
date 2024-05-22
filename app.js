import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import errorHandler from './middleware/errorMIddleware.js';
import submissionRoutes from './routes/submissionRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/submission', submissionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});