import PropTypes from "prop-types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SubmissionForm from "./SubmissionForm";

const SubmissionDialog = ({ isOpen, setIsOpen }) => {
    console.log(isOpen);

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
		>
			{/* Dialog panel */}
			<DialogPanel className="relative m-4 p-6 bg-slate-800 rounded-lg shadow-lg max-w-xl w-full overflow-y-auto">
				<div className="flex items-start justify-between">
					<DialogTitle className="text-lg font-semibold text-slate-100">
						Create New Submission
					</DialogTitle>
					<button
						className="p-2 rounded-md"
						onClick={() => setIsOpen(false)}
					>
						<XMarkIcon className="h-6 w-6 text-white stroke-2" />
					</button>
				</div>

				<div className="mt-4">
					<SubmissionForm closeDialog={() => setIsOpen(false)} />
				</div>
			</DialogPanel>
		</Dialog>
	);
};

SubmissionDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default SubmissionDialog;
