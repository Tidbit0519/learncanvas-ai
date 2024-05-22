const isEmpty = (obj) => {
	return JSON.stringify(obj) === "{}"
}

const getSubmission = (req, res) => {
	res.status(200).send("Get Submissions")
}

const getSubmissionById = (req, res) => {
	res.status(200).send(`Get Submission with id ${req.params.id}`)
}

const createSubmission = (req, res) => {
	if (isEmpty(req.body)) {
        res.status(400).send("No data provided")
    }

	res.status(200).send("Create Submission")
}

const updateSubmission = (req, res) => {
	if (isEmpty(req.body)) {
        res.status(400).send("No data provided")
    }

	res.status(200).send(`Update Submission with id ${req.params.id}`)
}

const deleteSubmission = (req, res) => {
	res.status(200).send(`Delete Submission with id ${req.params.id}`)
}

export {
	getSubmission,
	getSubmissionById,
	createSubmission,
	updateSubmission,
	deleteSubmission,
}
