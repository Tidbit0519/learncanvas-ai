import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
	const token = useSelector(selectCurrentToken);
	let isUser = false;
	let isAdmin = false;

	if (token) {
        const decoded = jwtDecode(token);
		const { id, firstname, role } = decoded;

		isUser = role === "user";
		isAdmin = role === "admin";
        
		return { id, firstname, isUser, isAdmin };
	}

	return { id:"", firstname:"", isUser, isAdmin };
};
export default useAuth;
