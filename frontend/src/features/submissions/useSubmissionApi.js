import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/authSlice';

const baseUrl = import.meta.env.VITE_API_URL;

const useSubmissionApi = () => {
    const token = useSelector(selectCurrentToken);
    const [submissions, setSubmissions] = useState([]);

    const getAllSubmissions = async () => {
        try {
            console.log('Token used for submission request: ', token);
            const response = await axios.get(`${baseUrl}/submissions`, {
                headers: {
                    Authorization: token,
                },
            });
            setSubmissions(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return {
        submissions,
        getAllSubmissions,
    };
};

export default useSubmissionApi;