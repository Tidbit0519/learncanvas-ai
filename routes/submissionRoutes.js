import { Router } from 'express';
import {
	testSubmission,
	getAllSubmission,
	getSubmissionById,
	createSubmission,
	updateSubmission,
	deleteSubmission,
} from "../controllers/submissionController.js"

const submissionRouter = Router();

submissionRouter.get('/testSubmission', testSubmission);
submissionRouter.get('', getAllSubmission);
submissionRouter.get('/:id', getSubmissionById);
submissionRouter.post('/', createSubmission);
submissionRouter.patch('/:id', updateSubmission);
submissionRouter.delete('/:id', deleteSubmission);

export default submissionRouter;