import { Submission, User } from "../model/index.js";
import { Router } from 'express';

const submissionRouter = Router();

const isEmpty = (obj) => {
	return JSON.stringify(obj) === "{}";
};

submissionRouter.get("/test", async (req, res) => {
	const resObj = {
		message: "Submission API is working!",
		user: req.user,
	};
	res.status(200).send(resObj);
});

submissionRouter.get("/", async (req, res) => {
	console.log("You are authorized to view this page");
	// try {
	// 	const submissions = await Submission.find({
	// 		user: req.user._id,
	// 	}).populate({
	// 		path: "user",
	// 		select: "email",
	// 	})
	// 	res.status(200).send(submissions)
	// }
	// catch (error) {
	// 	res.status(500).send(error.message)
	// }
});

submissionRouter.get("/:id", async (req, res) => {
	const submission = await Submission.findById(req.params.id);
	res.status(200).send(submission);
});

submissionRouter.post("/", async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided");
	}

	const newSubmission = await Submission.create(req.body);

	res.status(200).send(newSubmission);
});

submissionRouter.patch("/:id", async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided");
	}

	const submission = await Submission.findById(req.params.id);
	if (!submission) {
		res.status(404).send("Submission not found");
	}

	const updatedSubmission = await Submission.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).send(
		`Submission with id ${req.params.id} updated successfully`
	);
});

submissionRouter.delete("/:id", async (req, res) => {
	const submission = await Submission.findById(req.params.id);
	if (!submission) {
		res.status(404).send("Submission not found");
	}

	await Submission.findByIdAndDelete(req.params.id);
	res.status(200).send(`Deleted submission with id ${req.params.id}`);
});

export default submissionRouter;