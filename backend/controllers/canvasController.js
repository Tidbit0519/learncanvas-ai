import axios from "axios";
import jwt from "jsonwebtoken";
import { Token } from "../model/index.js";

const baseUrl = process.env.CANVAS_API_URL;
const token = "Bearer " + process.env.CANVAS_ACCESS_TOKEN;

const authenticateCanvasToken = async (req, res, next) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}

	try {
		const decoded = jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET);
		const tokenObj = await Token.findById(decoded.tokenId);
		if (!tokenObj) return res.sendStatus(403);

		req.canvasToken = tokenObj.canvasToken;
		req.domainUrl = tokenObj.domainUrl;
		next();
	} catch (error) {
		return res.sendStatus(403);
	}
};

const getSelf = async (req, res) => {
	console.log("Getting through req")
	console.log(req.domainUrl)
	console.log(req.canvasToken)
	console.log(`${req.domainUrl}/api/v1/users/self`)
	console.log("")
	console.log("Getting through hardcode")
	console.log(baseUrl)
	console.log(token)
	console.log(`${baseUrl}/users/self`)
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
}

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
}

export { authenticateCanvasToken, getSelf, getActiveCourses, getAssignments, getAssignmentById, getSubmissionById };