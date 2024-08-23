import PropTypes from "prop-types";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const AssignmentList = ({ assignments, setTutorAssignment }) => {
	const [activeId, setActiveId] = useState(null);
	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + 10;
	const currentItems = assignments.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(assignments.length / 10);

	const handlePageClick = (event) => {
		const newOffset = event.selected * 10 % assignments.length;
		setItemOffset(newOffset);
	};

	const handleAssignmentClick = (id) => {
		setActiveId((prevId) => (prevId === id ? null : id));
	};

	return (
		<div className="flex flex-col gap-2">
			{currentItems.map((assignment) => (
				<div
					key={assignment.id}
					className={`p-4 rounded-xl h-auto tracking-wider w-full hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer ${
						activeId === assignment.id
							? "bg-slate-700"
							: "bg-slate-800"
					}`}
					onMouseDown={() => {
						handleAssignmentClick(assignment.id);
						setTutorAssignment(assignment);
					}}
				>
					<div className="flex flex-col gap-2">
						<p>{assignment.name}</p>
						<div className="flex gap-2">
							{assignment.submission_types.map((type) => (
								<div
									key={type}
									className="text-xs px-2 py-1 bg-slate-600 text-slate-100 rounded-full"
								>
									<p>{type.replaceAll(/_/g, " ")}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
				activeClassName="bg-violet-500 text-slate-100 rounded-xl px-2"
				className="flex justify-center gap-4 mt-4 text-slate-400 text-lg font-semibold p-2 w-full"
			/>
		</div>
	);
};

AssignmentList.propTypes = {
	assignments: PropTypes.array.isRequired,
	setTutorAssignment: PropTypes.func.isRequired,
};

export default AssignmentList;
