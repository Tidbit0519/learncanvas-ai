import express from 'express';
import { Router } from 'express';
import {
	getAllSubmission,
	getSubmissionById,
	createSubmission,
	updateSubmission,
	deleteSubmission,
} from "../controllers/submissionController.js"

const submissionRouter = Router();

submissionRouter.get('', getAllSubmission);
submissionRouter.get('/:id', getSubmissionById);
submissionRouter.post('/', createSubmission);
submissionRouter.patch('/:id', updateSubmission);
submissionRouter.delete('/:id', deleteSubmission);

export default submissionRouter;