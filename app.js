import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import passportConfig from "./config/passportConfig.js";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMIddleware.js";
import submisstionRouter from "./routes/submissionRoutes.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
passportConfig(passport);
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/testAPI", (req, res) => {
	res.status(200).send("API is working!");
});

app.use("/api/auth", authRouter);
app.use(
	"/api",
	passport.authenticate("jwt", { session: false }),
	submisstionRouter
);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});
