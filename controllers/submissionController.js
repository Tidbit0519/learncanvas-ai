import asyncHandler from "express-async-handler"
import Submission from "../model/Submission.js"
import User from "../model/User.js"

const isEmpty = (obj) => {
	return JSON.stringify(obj) === "{}"
}

const testSubmission = asyncHandler(async (req, res) => {
	const resObj = {
		message: "Submission API is working!",
		user: req.user,
	}
	res.status(200).send(resObj)
});

const getAllSubmission = asyncHandler(async (req, res) => {
	const submissions = await Submission.find({})
	res.status(200).send(submissions)
})

const getSubmissionById = asyncHandler(async (req, res) => {
	const submission = await Submission.findById(req.params.id)
	res.status(200).send(submission)
})

const createSubmission = asyncHandler(async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided")
	}

	await Submission.create(req.body)

	res.status(200).send("Submission created successfully")
})

const updateSubmission = asyncHandler(async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided")
	}

	const submission = await Submission.findById(req.params.id)
	if (!submission) {
		res.status(404).send("Submission not found")
	}

	const updatedSubmission = await Submission.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	)

	res
	.status(200)
	.send(`Submission with id ${req.params.id} updated successfully`)
})

const deleteSubmission = asyncHandler(async (req, res) => {
	const submission = await Submission.findById(req.params.id)
	if (!submission) {
		res.status(404).send("Submission not found")
	}

	await Submission.findByIdAndDelete(req.params.id)
	res.status(200).send(`Deleted submission with id ${req.params.id}`)
})

export {
	testSubmission,
	getAllSubmission,
	getSubmissionById,
	createSubmission,
	updateSubmission,
	deleteSubmission,
}
