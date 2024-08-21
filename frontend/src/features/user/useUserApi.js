import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

const baseUrl = import.meta.env.VITE_API_URL;

const useUserApi = () => {
	const token = useSelector(selectCurrentToken);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(null);

    const getAllUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/users`, {
                headers: {
                    Authorization: token,
                },
            });
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
            console.error(err);
        }
    };

    const getUserById = async (userId) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${baseUrl}/users/${userId}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setUser(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
            console.error(err);
        }
    };

    const updateUserById = async (userId, data) => {
        try {
            setLoading(true);
            console.log("Data", data);
            // eslint-disable-next-line no-unused-vars
            const response = await axios.patch(
                `${baseUrl}/users/${userId}`,
                data,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setLoading(false);
            return true;
        } catch (err) {
            setLoading(false);
            setError(err.response.data);
            console.error(err);
        }
    };

    return { loading, error, users, user, getAllUsers, getUserById, updateUserById };
};

export default useUserApi;
