const getSubmission = (req, res) => {
    res.status(200).send('Get Submissions');
}

const getSubmissionById = (req, res) => {
    res.status(200).send(`Get Submission with id ${req.params.id}`)
}

const createSubmission = (req, res) => {
    res.status(200).send("Create Submission")
}

const updateSubmission = (req, res) => {
    res.status(200).send(`Update Submission with id ${req.params.id}`)
}

const deleteSubmission = (req, res) => {
    res.status(200).send(`Delete Submission with id ${req.params.id}`)
}

export { getSubmission, getSubmissionById, createSubmission, updateSubmission, deleteSubmission };