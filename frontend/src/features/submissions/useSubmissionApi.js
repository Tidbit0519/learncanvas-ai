import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/authSlice';

const baseUrl = import.meta.env.VITE_API_URL;

const useSubmissionApi = () => {
    const token = useSelector(selectCurrentToken);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [submission, setSubmission] = useState(null);

    const getAllSubmissions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/submissions`, {
                headers: {
                    Authorization: token,
                },
            });
            setSubmissions(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
            console.error(err);
        }
    };

    const getSubmissionById = async (submissionId) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${baseUrl}/submissions/${submissionId}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log(response.data)
            setSubmission(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
            console.error(err);
        }
    };

    const createSubmission = async (submissionData) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${baseUrl}/submissions`,
                submissionData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setSubmission(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
            console.error(err);
        }
    }

    return {
        loading,
        error,
        submission,
        submissions,
        getAllSubmissions,
        getSubmissionById,
        createSubmission,
    };
};

export default useSubmissionApi;