import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./features/auth/authSlice";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Submissions from "./pages/Submissions";
import SubmissionById from "./pages/SubmissionById";

import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			dispatch(setCredentials({ token: token }));
		}
	}, []);

	return (
		<Routes>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/signup"
				element={<Signup />}
			/>

			<Route
				path="/"
				element={<Layout />}
			>
				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth />}>
						<Route
							index
							element={<Home />}
						/>
						<Route
							path="submissions"
							element={<Submissions />}
						/>
						<Route
							path="submissions/:submissionId"
							element={<SubmissionById />}
						/>
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
