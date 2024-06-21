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

    return {
        loading,
        error,
        submissions,
        getAllSubmissions,
    };
};

export default useSubmissionApi;