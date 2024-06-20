import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";
import { useSelector } from "react-redux";

const PersistLogin = () => {
	const [loading, setloading] = useState(true);
    const [refresh] = useRefreshMutation();
    const token = useSelector(selectCurrentToken);
    const persist = localStorage.getItem("persist");
    
	useEffect(() => {
        let isMounted = true;
        
        const verifyRefreshToken = async () => {
            try {
                await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setloading(false);
			}
        };
        
        if (!token && persist === "true") {
            verifyRefreshToken();
        } else {
            setloading(false);
        }
        
        return () => {
            isMounted = false;
        }
	}, []);

	return (
		<>{!persist ? <Outlet /> : loading ? <p>Loading...</p> : <Outlet />}</>
	);
};

export default PersistLogin;
