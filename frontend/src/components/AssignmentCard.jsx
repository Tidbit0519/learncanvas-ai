import PropTypes from "prop-types";
import { styles } from "../utils/styles";

const AssignmentCard = ({ assignment }) => {
	const { description } = assignment;

	return (
		<>
			<h2 className={`${styles.sectionSubText}`}>
				Assignment Description
			</h2>
			<div className="text-slate-200">
				<p className="text-lg font-semibold pb-4">{assignment.name}</p>
				<div
					dangerouslySetInnerHTML={{ __html: description }}
					className="flex flex-col gap-2 pb-4"
				/>
			</div>
		</>
	);
};

AssignmentCard.propTypes = {
	assignment: PropTypes.object,
};

export default AssignmentCard;
