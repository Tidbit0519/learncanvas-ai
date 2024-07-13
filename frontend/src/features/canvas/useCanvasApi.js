import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

const baseUrl = import.meta.env.VITE_API_URL;

const useCanvasApi = () => {
	const token = useSelector(selectCurrentToken);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [activeCourses, setActiveCourses] = useState([]);
	const [assignments, setAssignments] = useState([]);

	const getAllActiveCourses = async () => {
		try {
			setError(null);
			setLoading(true);
			const response = await axios.get(
				`${baseUrl}/canvas/activeCourses`,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			setActiveCourses(response.data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err);
			console.error(err);
		}
	};

	const getAllAssignments = async (courseId) => {
		try {
			setError(null);
			setLoading(true);
			const response = await axios.get(
				`${baseUrl}/canvas/${courseId}/assignments`,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			setAssignments(response.data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err);
			console.error(err);
		}
	};

	return {
		loading,
		error,
		activeCourses,
		assignments,
		getAllActiveCourses,
		getAllAssignments,
	};
};

export default useCanvasApi;
