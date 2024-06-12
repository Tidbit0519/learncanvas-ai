import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import passportConfig from "./config/passportConfig.js";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMIddleware.js";
import { authRouter, submissionRouter, userRouter } from "./routes/index.js";

dotenv.config();
connectDB();
passportConfig(passport);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/ping", (req, res) => {
	res.status(200).send("API is working!");
});

app.use("/api/auth", authRouter);
app.use(
	"/api/submissions",
	passport.authenticate("jwt", { session: false }),
	submissionRouter
);
app.use(
	"/api/users",
	passport.authenticate("jwt", { session: false }),
	userRouter
);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});
