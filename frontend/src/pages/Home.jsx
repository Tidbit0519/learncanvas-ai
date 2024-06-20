import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useSubmissionApi from "../features/submissions/useSubmissionApi";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const Home = () => {
	const token = useSelector(selectCurrentToken);
	const { firstname, isAdmin, isUser } = useAuth();
	const { submissions, getAllSubmissions } = useSubmissionApi();

	useEffect(() => {
		if (token) {
			getAllSubmissions();
		}
	}
	, [token]);

	const content = (
		<section>
			<h1>Welcome, {firstname}!</h1>
			{isAdmin && <p>You are an admin.</p>}
			{isUser && <p>You are a user.</p>}
			<h2>Your Submissions</h2>
			<ul>
				{submissions.length > 1 ? (
					submissions
				) : (
					<p>No submissions found.</p>
				)}
			</ul>
		</section>
	);

	return content;
};

export default Home;
