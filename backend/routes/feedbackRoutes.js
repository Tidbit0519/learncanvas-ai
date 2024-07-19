import { Router } from "express";
import handleFeedback from "../controllers/feedbackController.js";

const feedbackRouter = Router();

feedbackRouter.post("/", handleFeedback);

export default feedbackRouter;