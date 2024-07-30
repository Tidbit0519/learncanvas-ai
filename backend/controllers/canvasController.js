import axios from "axios";

const baseUrl = process.env.CANVAS_API_URL;
const token = "Bearer " + process.env.CANVAS_ACCESS_TOKEN;

const getSelf = async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/users/self`, {
            headers: {
                Authorization: token,
            },
		});
        res.status(200).send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const getActiveCourses = async (req, res) => {
	try {
		const response = await axios.get(
			// `${baseUrl}/courses?per_page=100&enrollment_state=active`,
			`${baseUrl}/courses/1469808`,
			{
				headers: {
					Authorization: token,
				},
			}
		);
		// res.status(200).send(response.data);
		res.status(200).send([response.data]);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

const getAssignments = async (req, res) => {
	try {
		const response = await axios.get(
			`${baseUrl}/courses/${req.params.courseId}/assignments?per_page=100`,
			{
				headers: {
					Authorization: token,
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
			`${baseUrl}/courses/${req.params.courseId}/assignments/${req.params.assignmentId}`,
			{
				headers: {
					Authorization: token,
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
			`${baseUrl}/courses/${req.params.courseId}/assignments/${req.params.assignmentId}/submissions/${req.params.userId}`,
			{
				headers: {
					Authorization: token,
				},
			}
		);
		console.log(response.data);
        res.status(200).send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

export { getSelf, getActiveCourses, getAssignments, getAssignmentById, getSubmissionById };