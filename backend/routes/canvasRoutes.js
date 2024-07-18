import { Router } from "express";
import { getSelf, getActiveCourses, getAssignments } from "../controllers/canvasController.js";

const canvasRouter = Router();

canvasRouter.get("/users/self", getSelf);
canvasRouter.get("/courses/activeCourses", getActiveCourses);
canvasRouter.get("/courses/:courseId/assignments", getAssignments);

export default canvasRouter;
