import PropTypes from "prop-types";

const AssignmentList = ({ assignments }) => {
    const filteredAssignments = assignments.filter((assignment) => {
        return assignment.submission_types.includes("online_upload") || assignment.submission_types.includes("online_text_entry");
    });

    return (
		<div>
			{filteredAssignments.map((assignment) => (
				<div
					key={assignment.id}
					className="flex flex-col gap-2 bg-slate-800 p-2 px-4 my-2 rounded-xl h-auto tracking-wider"
				>
					<div className="flex justify-between">
						<div className="flex items-center mr-auto truncate w-3/5 lg:w-5/6">
							<p>{assignment.name}</p>
						</div>
						<button className="px-2 ml-auto bg-violet-700 rounded-xl text-slate-100 hover:bg-violet-800 tracking-wider max-w-[200px] text-sm min-w-fit">
							Tutor Me!
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

AssignmentList.propTypes = {
    assignments: PropTypes.array.isRequired,
};

export default AssignmentList;