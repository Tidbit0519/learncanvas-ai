import asyncHandler from "express-async-handler"

const isEmpty = (obj) => {
	return JSON.stringify(obj) === "{}"
}

const getSubmission = asyncHandler(async (req, res) => {
	res.status(200).send("Get Submissions")
})

const getSubmissionById = asyncHandler(async (req, res) => {
	res.status(200).send(`Get Submission with id ${req.params.id}`)
})

const createSubmission = asyncHandler(async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided")
	}

	res.status(200).send("Create Submission")
})

const updateSubmission = asyncHandler(async (req, res) => {
	if (isEmpty(req.body)) {
		res.status(400).send("No data provided")
	}

	res.status(200).send(`Update Submission with id ${req.params.id}`)
})

const deleteSubmission = asyncHandler(async (req, res) => {
	res.status(200).send(`Delete Submission with id ${req.params.id}`)
})

export {
	getSubmission,
	getSubmissionById,
	createSubmission,
	updateSubmission,
	deleteSubmission,
}
