import { Router } from "express";
import { getSelf, getActiveCourses, getAssignments, getSubmission } from "../controllers/canvasController.js";

const canvasRouter = Router();

canvasRouter.get("/users/self", getSelf);
canvasRouter.get("/courses/activeCourses", getActiveCourses);
canvasRouter.get("/courses/:courseId/assignments", getAssignments);
canvasRouter.get("/courses/:courseId/assignments/:assignmentId/submissions/:userId", getSubmission);

export default canvasRouter;
