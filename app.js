import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});