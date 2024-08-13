import { Router } from "express";
import {
	authenticateCanvasToken,
	getSelf,
	getActiveCourses,
	getAssignments,
	getAssignmentById,
	getSubmissionById,
} from "../controllers/canvasController.js";

const canvasRouter = Router();

canvasRouter.get("/users/self", authenticateCanvasToken, getSelf);
canvasRouter.get(
	"/courses/activeCourses",
	authenticateCanvasToken,
	getActiveCourses
);
canvasRouter.get(
	"/courses/:courseId/assignments",
	authenticateCanvasToken,
	getAssignments
);
canvasRouter.get(
	"/courses/:courseId/assignments/:assignmentId",
	authenticateCanvasToken,
	getAssignmentById
);
canvasRouter.get(
	"/courses/:courseId/assignments/:assignmentId/submissions/:userId",
	authenticateCanvasToken,
	getSubmissionById
);

export default canvasRouter;
