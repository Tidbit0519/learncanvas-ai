import PropTypes from "prop-types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { styles } from "../utils/styles";
import Ripples from "react-ripples";

const CanvasCourseCard = ({ course }) => {
    return (
        <Ripples>
		<div
			className="flex flex-col gap-y-2 bg-slate-800 p-6 rounded-2xl h-auto tracking-wider hover:shadow-2xl active:shadow-none active:translate-y-1 transition-shadow duration-300 ease-in-out cursor-pointer"
			role="button"
			tabIndex={0}
			onClick={() => {
				console.log(`View ${course.name} Submission`);
			}}
		>
			<div className="flex flex-col justify-between">
				<p className={styles.sectionSubText}>{course.name}</p>
				<p className="text-slate-500">{course.course_code}</p>
			</div>
			<div className="flex justify-end gap-2 pt-2 mt-auto">
				<div className="flex justify-end gap-2 pt-2 mt-auto">
					<button className="p-2 bg-slate-800 rounded-2xl text-white hover:bg-slate-900">
						<ArrowRightIcon className="h-4 w-4" />
					</button>
				</div>
			</div>
            </div>
        </Ripples>
	);
};

CanvasCourseCard.propTypes = {
	course: PropTypes.object.isRequired,
};

export default CanvasCourseCard;
