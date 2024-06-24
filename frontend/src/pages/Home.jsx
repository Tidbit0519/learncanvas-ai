import  { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { styles } from "../utils/styles";
import useCanvasApi from "../features/canvas/useCanvasApi";
import CanvasCourseCard from "../components/CanvasCourseCard";

const Home = () => {
	const { firstname } = useAuth();
	const { loading, error, activeCourses, getAllActiveCourses } = useCanvasApi();

	useEffect(() => {
		getAllActiveCourses();
	}, []);

	const content = (
		<section className="flex flex-col justify-center gap-4 py-8 my-8 mx-4 px-8">
			<div className="flex sm:justify-center lg:justify-normal lg:px-4">
				<h1 className={styles.sectionHeadText}>
					Welcome,{" "}
					<span className="text-violet-600"> {firstname}</span>
				</h1>
			</div>
			<div className="flex flex-col gap-4 bg-slate-900 p-8 rounded-2xl h-full">
				<h2 className={`${styles.sectionSubText} pl-2 font-bold`}>
					Your Active Courses
				</h2>
				<p className="pl-2">
					Here are your active courses. Click on a course to view
					submissions.
				</p>
				{loading ? (
					<p>Loading active courses...</p>
				) : (
					<div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
						{activeCourses.length > 0 ? (
							activeCourses.map((course) => (
								<CanvasCourseCard key={course.id} course={course} />
							))
						) : (
							<p>No active courses found.</p>
						)}
					</div>
				)}
				{error && <p>Error loading active courses.</p>}
			</div>
		</section>
	);

	return content;
};

export default Home;
