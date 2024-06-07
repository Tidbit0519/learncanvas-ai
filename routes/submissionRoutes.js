import { Submission, User } from "../model/index.js";
import { Router } from "express";

const submissionRouter = Router();

submissionRouter.get("/", async (req, res) => {
	const { userId } = req.query;
	if (userId && isAdmin()) {
		const submissions = await Submission.find({
			user: userId
		}).populate({
			path: "user",
			select: "email role",
			model: User,
		});
		return res.status(200).send(submissions);
	}

	const submissions = await Submission.find({
		user: req.user._id
	}).populate({
		path: "user",
		select: "email role",
		model: User,
	});
	res.status(200).send(submissions);
});

submissionRouter.get("/:id", async (req, res) => {
	const { userId } = req.query;
	if (userId && isAdmin()) {
		const submission = await Submission.findById(req.params.id);
		if (!submission) {
			return res.status(404).send("Submission not found");
		}
		return res.status(200).send(submission);
	}

	const submission = await Submission.findById(req.params.id);
	if (!submission){
		return res.status(404).send("Submission not found");
	} else if (submission.user.toString() !== req.user._id.toString()) {
		return res.status(401).send("Unauthorized access");
	}
	res.status(200).send(submission);
});

submissionRouter.post("/", async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided");
	}

	const { userId } = req.query;
	if (userId && isAdmin()) {
		const newSubmission = await Submission.create({
			...req.body,
			user: userId,
		});

		return res.status(200).send(newSubmission);
	}

	const newSubmission = await Submission.create({
		...req.body,
		user: req.user._id,
	});

	res.status(200).send(newSubmission);
});

submissionRouter.patch("/:id", async (req, res) => {
	if (isEmpty(req.body)) {
		return res.status(400).send("No data provided");
	}

	const { userId } = req.query;
	if (userId && isAdmin()) {
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
	const { userId } = req.query;
	if (userId && isAdmin()) {
		const submission = await Submission.findById(req.params.id);
		if (!submission) {
			return res.status(404).send("Submission not found");
		}
	
		await Submission.findByIdAndDelete(req.params.id);
		return res.status(200).send(`Deleted submission with id ${req.params.id}`);
	}

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
