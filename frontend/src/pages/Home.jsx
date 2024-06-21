import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useSubmissionApi from "../features/submissions/useSubmissionApi";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { styles } from "../utils/styles";
import Submission from "../components/SubmissionCard";

const Home = () => {
	const token = useSelector(selectCurrentToken);
	const { firstname } = useAuth();
	const { loading, error, submissions, getAllSubmissions } =
		useSubmissionApi();

	useEffect(() => {
		if (token) {
			getAllSubmissions();
		}
	}, [token]);

	const content = (
		<section className="flex flex-col justify-center gap-4 py-8 my-8 mx-4 px-8">
			{loading ? (
				<p>Loading submissions...</p>
			) : (
				<>
					<div className="flex sm:justify-center lg:justify-normal lg:px-4">
						<h1 className={styles.sectionHeadText}>
							Welcome,{" "}
							<span className="text-violet-600">
								{" "}
								{firstname}
							</span>
						</h1>
					</div>
					<div className="flex flex-col gap-4 bg-slate-900 p-8 rounded-2xl h-full">
						<h2
							className={`${styles.sectionSubText} pl-2`}
						>
							Your Submissions
						</h2>
						<div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
							{submissions.length > 0 ? (
								submissions.map((submission) => (
									<Submission
										key={submission._id}
										submission={submission}
									/>
								))
							) : (
								<p className="text-slate-500">
									No submissions found.
								</p>
							)}
						</div>
					</div>
				</>
			)}
			{error && (
				<p className="text-red-500">Error loading submissions.</p>
			)}
		</section>
	);

	return content;
};

export default Home;
