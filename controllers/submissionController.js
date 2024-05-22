import asyncHandler from "express-async-handler"
import submissionModel from "../model/submissionModel.js"

const isEmpty = (obj) => {
	return JSON.stringify(obj) === "{}"
}

const getSubmission = asyncHandler(async (req, res) => {
	const submissions = await submissionModel.find({})
	res.status(200).send(submissions)
})

const getSubmissionById = asyncHandler(async (req, res) => {
	const submission = await submissionModel.findById(req.params.id)
	res.status(200).send(submission)
})

const createSubmission = asyncHandler(async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided")
	}

	const newSubmission = await submissionModel.create(req.body)

	res.status(200).send("Submission created successfully", newSubmission)
})

const updateSubmission = asyncHandler(async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided")
	}

	const submission = await submissionModel.findById(req.params.id)
	if (!submission) {
		res.status(404).send("Submission not found")
	}

	const updatedSubmission = await submissionModel.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	)

	res.status(200).send("Submission updated successfully", updatedSubmission)
})

const deleteSubmission = asyncHandler(async (req, res) => {
    const submission = await submissionModel.findById(req.params.id)
    if (!submission) {
        res.status(404).send("Submission not found")
    }

    await submissionModel.remove()
	res.status(200).send(`Delete Submission with id ${req.params.id}`)
})

export {
	getSubmission,
	getSubmissionById,
	createSubmission,
	updateSubmission,
	deleteSubmission,
}
