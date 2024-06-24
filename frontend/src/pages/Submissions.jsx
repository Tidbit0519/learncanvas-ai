import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import useSubmissionApi from "../features/submissions/useSubmissionApi";

import {
	Button,
} from "@headlessui/react";
import { styles } from "../utils/styles";
import { PlusIcon } from "@heroicons/react/24/outline";
import Submission from "../components/SubmissionCard";
import SubmissionDialog from "../components/SubmissionDialog";

const Submissions = () => {
	const token = useSelector(selectCurrentToken);
	const { loading, error, submissions, getAllSubmissions } =
		useSubmissionApi();

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (token) {
			getAllSubmissions();
		}
	}, [token]);

	const content = (
		<>
			<section
				className={
					isOpen
						? `blur-sm flex flex-col justify-center gap-4 py-8 my-8 mx-4 px-8`
						: `flex flex-col justify-center gap-4 py-8 my-8 mx-4 px-8`
				}
			>
				{loading ? (
					<p>Loading submissions...</p>
				) : (
					<>
						<div className="flex flex-col gap-4 bg-slate-900 p-8 rounded-2xl h-full">
							<h2 className={`${styles.sectionSubText} pl-2`}>
								Your Submissions
							</h2>
							<div className="flex items-center lg:justify-end sm:justify-center">
								<Button
									className="p-2 px-4 bg-violet-700 rounded-xl text-slate-100 hover:bg-violet-800 tracking-wider max-w-[300px]"
									onClick={() => {
										setIsOpen(true);
									}}
								>
									<div className="flex items-center gap-2">
										<PlusIcon className="h-4 w-4 stroke-2" />
										Create New Submission
									</div>
								</Button>
							</div>
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

			<SubmissionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);

	return content;
};

export default Submissions;
