import { Submission, User } from "../model/index.js";
import { Router } from "express";

const submissionRouter = Router();

const isEmpty = (obj) => {
	return JSON.stringify(obj) === "{}";
};

submissionRouter.get("/", async (req, res) => {
	const { userId } = req.query;
	const currentUser = await User.findById(req.user._id);

	if (userId && !currentUser.isAdmin()) {
		return res.status(403).send("Unauthorized access");
	}

	// If userId is provided and user is admin, return submissions for that user
	if (userId && currentUser.isAdmin()) {
		const submissions = await Submission.find({ user: userId });
		return res.status(200).send(submissions);
	}

	// If userId is not provided, return all submissions for the current user
	const submissions = await Submission.find({ user: req.user._id });
	res.status(200).send(submissions);
});

submissionRouter.get("/:id", async (req, res) => {
	const currentUser = await User.findById(req.user._id);

	// If user is admin, return submission regardless of user
	const submission = await Submission.findById(req.params.id);
	if (!submission) {
		return res.status(404).send("Submission not found");
	} else if (
		submission.user.toString() !== req.user._id.toString() &&
		!currentUser.isAdmin()
	) {
		return res.status(401).send("Unauthorized access");
	}

	res.status(200).send(submission);
});

submissionRouter.post("/", async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided");
	}

	const { userId } = req.query;

	if (userId && !currentUser.isAdmin()) {
		return res.status(403).send("Unauthorized access");
	}

	// If userId is provided and user is admin, create submission for that user
	if (userId && isAdmin()) {
		if (!Submission.find({ user: userId })) {
			return res.status(404).send("User not found");
		}
		const newSubmission = await Submission.create({
			...req.body,
			user: userId,
		});

		return res.status(200).send(newSubmission);
	}

	// If userId is not provided, create submission for current user
	const newSubmission = await Submission.create({
		...req.body,
		user: req.user._id,
	});

	const user = await User.findById(req.user._id);
	user.submissions.push(newSubmission);
	await user.save();

	res.status(200).send(newSubmission);
});

submissionRouter.patch("/:id", async (req, res) => {
	if (isEmpty(req.body)) {
		return res.status(400).send("No data provided");
	}

	const { userId } = req.query;

	if (userId && !currentUser.isAdmin()) {
		return res.status(403).send("Unauthorized access");
	}

	// If userId is provided and user is admin, update submission for that user
	if (userId && isAdmin()) {
		if (!Submission.find({ user: userId })) {
			return res.status(404).send("User not found");
		}

		const submission = await Submission.findById(req.params.id);
		if (!submission) {
			return res.status(404).send("Submission not found");
		}

		const updatedSubmission = await Submission.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		return res.status(200).send(updatedSubmission);
	}

	// If userId is not provided, update submission for current user
	const submission = await Submission.findById(req.params.id);
	if (!submission) {
		return res.status(404).send("Submission not found");
	} else if (submission.user.toString() !== req.user._id.toString()) {
		return res.status(401).send("Unauthorized access");
	}

	const updatedSubmission = await Submission.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).send(updatedSubmission);
});

submissionRouter.delete("/:id", async (req, res) => {
	const currentUser = await User.findById(req.user._id);

	// If userId is provided and user is admin, delete submission for that user
	if (currentUser.isAdmin()) {
		const submission = await Submission.findById(req.params.id);
		if (!submission) {
			return res.status(404).send("Submission not found");
		}

		await Submission.findByIdAndDelete(req.params.id);
		return res
			.status(200)
			.send(`Deleted submission with id ${req.params.id}`);
	}

	// If userId is not provided, delete submission for current user
	const submission = await Submission.findById(req.params.id);
	if (!submission) {
		return res.status(404).send("Submission not found");
	} else if (submission.user.toString() !== req.user._id.toString()) {
		return res.status(401).send("Unauthorized access");
	}

	await Submission.findByIdAndDelete(req.params.id);
	res.status(200).send(`Deleted submission with id ${req.params.id}`);
});

export default submissionRouter;