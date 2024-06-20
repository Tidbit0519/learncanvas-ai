import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
    const location = useLocation();
    const token = useSelector(selectCurrentToken);

    if (token) {
        return <Outlet />;
    } else {
        return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
    }
}

export default RequireAuth