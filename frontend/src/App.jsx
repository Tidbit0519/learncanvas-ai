import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Assignments from "./pages/Assignments";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";

import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";

function App() {
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
							path="courses/:courseId/assignments"
							element={<Assignments />}
						/>
						<Route
							path="courses/:courseId/assignments/:assignmentId/feedback"
							element={<Feedback />}
						/>
						<Route
							path="profile"
							element={<Profile />}
						/>
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
