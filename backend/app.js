import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import passportConfig from "./config/passportConfig.js";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";
import {
	authRouter,
	canvasRouter,
	userRouter,
	feedbackRouter,
} from "./routes/index.js";

import cron from "node-cron";
import { resetPromptLeft } from "./controllers/userController.js";

dotenv.config();
connectDB();
passportConfig(passport);

const app = express();
const PORT = process.env.PORT || 5000;

// Reset prompt left for all users at midnight
cron.schedule("0 0 * * *", async () => {
	console.log("Resetting prompt left for all users");
	try {
		await resetPromptLeft();
	} catch (error) {
		console.error("Error resetting prompt left:", error);
	}
});

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);
app.use(cookieParser());

app.use(bodyParser.text({ type: "text/plain" }));
app.use(
	"/api/feedback",
	passport.authenticate("jwt", { session: false }),
	feedbackRouter
);

app.use(bodyParser.json());
app.get("/ping", (req, res) => {
	res.status(200).send("API is working!");
});

app.use("/api/auth", authRouter);
app.use(
	"/api/canvas",
	passport.authenticate("jwt", { session: false }),
	canvasRouter
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
