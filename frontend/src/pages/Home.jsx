import useAuth from "../hooks/useAuth";
import { styles } from "../utils/styles";
import { Link } from "react-router-dom";

const Home = () => {
	const { firstname } = useAuth();

	const content = (
		<section className="flex flex-col justify-center gap-4 py-8 my-8 mx-4 px-8">
			<div className="flex sm:justify-center lg:justify-normal lg:px-4">
				<h1 className={styles.sectionHeadText}>
					Welcome,{" "}
					<span className="text-violet-600"> {firstname}</span>
				</h1>
			</div>
			<div className="flex flex-col gap-4 bg-slate-900 p-8 rounded-2xl h-full">
				<h2 className={`${styles.sectionSubText} pl-2`}>
					Quick Links
				</h2>
				<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
					<Link
						to="/submissions"
						className="flex justify-center items-center bg-violet-700 p-4 rounded-2xl text-white hover:bg-violet-800"
					>
						<p>View Submissions</p>
					</Link>
					<Link
						to="/submissions/new"
						className="flex justify-center items-center bg-violet-700 p-4 rounded-2xl text-white hover:bg-violet-800"
					>
						<p>Create New Submission</p>
					</Link>
				</div>
			</div>
		</section>
	);

	return content;
};

export default Home;
