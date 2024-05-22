import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import errorHandler from './middleware/errorMIddleware.js';
import submissionRoutes from './routes/submissionRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/submission', submissionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});