import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

const baseUrl = import.meta.env.VITE_API_URL;

const useCanvasApi = () => {
	const token = useSelector(selectCurrentToken);
	const [canvasLoading, setCanvasLoading] = useState(false);
	const [canvasError, setCanvasError] = useState(null);
	const [userId, setUserId] = useState(null);
	const [activeCourses, setActiveCourses] = useState([]);
	const [assignments, setAssignments] = useState([]);
	const [assignment, setAssignment] = useState(null);
	const [submission, setSubmission] = useState(null);

	const getSelf = async () => {
		try {
			setCanvasError(null);
			setCanvasLoading(true);
			const response = await axios.get(`${baseUrl}/canvas/users/self`, {
				headers: {
					Authorization: token,
				},
			});
			setUserId(response.data.id);
			setCanvasLoading(false);
		} catch (err) {
			setCanvasLoading(false);
			setCanvasError(err);
			console.error(err);
		}
	};

	const getAllActiveCourses = async () => {
		try {
			setCanvasError(null);
			setCanvasLoading(true);
			const response = await axios.get(
				`${baseUrl}/canvas/courses/activeCourses`,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			setActiveCourses(response.data);
			setCanvasLoading(false);
		} catch (err) {
			setCanvasLoading(false);
			setCanvasError(err);
			console.error(err);
		}
	};

	const getAllAssignments = async (courseId) => {
		try {
			setCanvasError(null);
			setCanvasLoading(true);
			const response = await axios.get(
				`${baseUrl}/canvas/courses/${courseId}/assignments`,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			setAssignments(response.data);
			setCanvasLoading(false);
		} catch (err) {
			setCanvasLoading(false);
			setCanvasError(err);
			console.error(err);
		}
	};

	const getAssignmentById = async (courseId, assignmentId) => {
		try {
			setCanvasLoading(true);
			const response = await axios.get(
				`${baseUrl}/canvas/courses/${courseId}/assignments/${assignmentId}`,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			setAssignment(response.data);
			setCanvasLoading(false);
		} catch (err) {
			setCanvasLoading(false);
			setCanvasError(err);
			console.error(err);
		}
	};

	const getSubmissionById = async (courseId, assignmentId, userId) => {
		try {
			setCanvasLoading(true);
			const response = await axios.get(
				`${baseUrl}/canvas/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			setSubmission(response.data);
			setCanvasLoading(false);
		} catch (err) {
			setSubmission(null);
			setCanvasLoading(false);
			setCanvasError(err);
			console.error(err);
		}
	};

	return {
		loading: canvasLoading,
		error: canvasError,
		userId,
		activeCourses,
		assignment,
		assignments,
		submission,
		getSelf,
		getAllActiveCourses,
		getAllAssignments,
		getAssignmentById,
		getSubmissionById,
	};
};

export default useCanvasApi;
