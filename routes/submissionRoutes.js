import express from 'express';
import { Router } from 'express';
import {
	getSubmission,
	getSubmissionById,
	createSubmission,
	updateSubmission,
	deleteSubmission,
} from "../controllers/submissionController.js"

const submissionRouter = Router();

submissionRouter.get('/all', getSubmission);
submissionRouter.get('/:id', getSubmissionById);
submissionRouter.post('/', createSubmission);
submissionRouter.put('/:id', updateSubmission);
submissionRouter.delete('/:id', deleteSubmission);

export default submissionRouter;