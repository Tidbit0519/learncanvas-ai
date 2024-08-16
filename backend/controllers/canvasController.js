import axios from "axios";

const getSelf = async (req, res) => {
	try {
		const response = await axios.get(`${req.domainUrl}/api/v1/users/self`, {
			headers: {
				Authorization: `Bearer ${req.canvasToken}`,
			},
		});
		res.status(200).send(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

const getActiveCourses = async (req, res) => {
	try {
		const response = await axios.get(
			// `${baseUrl}/courses?per_page=100&enrollment_state=active`,
			`${req.domainUrl}/api/v1/courses/1469808`,
			{
				headers: {
					Authorization: `Bearer ${req.canvasToken}`,
				},
			}
		);
		res.status(200).send([response.data]);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

const getAssignments = async (req, res) => {
	try {
		const response = await axios.get(
			`${req.domainUrl}/api/v1/courses/${req.params.courseId}/assignments?per_page=100`,
			{
				headers: {
					Authorization: `Bearer ${req.canvasToken}`,
				},
			}
		);
		res.status(200).send(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

const getAssignmentById = async (req, res) => {
	try {
		const response = await axios.get(
			`${req.domainUrl}/api/v1/courses/${req.params.courseId}/assignments/${req.params.assignmentId}`,
			{
				headers: {
					Authorization: `Bearer ${req.canvasToken}`,
				},
			}
		);
		res.status(200).send(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

const getSubmissionById = async (req, res) => {
	try {
		const response = await axios.get(
			`${req.domainUrl}/api/v1/courses/${req.params.courseId}/assignments/${req.params.assignmentId}/submissions/${req.params.userId}`,
			{
				headers: {
					Authorization: `Bearer ${req.canvasToken}`,
				},
			}
		);
		res.status(200).send(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

export {
	getSelf,
	getActiveCourses,
	getAssignments,
	getAssignmentById,
	getSubmissionById,
};
