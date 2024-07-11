/* eslint-disable react/display-name */
import { memo } from "react";
import PropTypes from "prop-types";

const AssignmentList = memo(({ assignments }) => {
	const filteredAssignments = assignments.filter((assignment) => {
		return (
			assignment.submission_types.includes("online_upload") ||
			assignment.submission_types.includes("online_text_entry")
		);
	});

	return (
		<div className="flex flex-col gap-2">
			{filteredAssignments.map((assignment) => (
				<div
					key={assignment.id}
					className="bg-slate-800 p-4 rounded-xl h-auto tracking-wider w-full"
				>
					<div className="truncate">
						<p>{assignment.name}</p>
					</div>
				</div>
			))}
		</div>
	);
});

AssignmentList.propTypes = {
	assignments: PropTypes.array.isRequired,
};

export default AssignmentList;
