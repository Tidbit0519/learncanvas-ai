import PropType from "prop-types";
import { useForm } from "react-hook-form";
import useSubmissionApi from "../features/submissions/useSubmissionApi";

const SubmissionForm = ({ closeDialog }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { loading, error, createSubmission } = useSubmissionApi();

	const onSubmit = async (data) => {
		try {
			await createSubmission(data);
            if (error === null) {
                closeDialog();
                window.location.reload();
			}
		} catch (err) {
			console.error(err);
		}
	};

    return (
		<div>
			<form
				className="flex flex-col gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col">
					<label className="pb-2">Content Summary:</label>
					<textarea
						{...register("content_summary", { required: true })}
						type="text"
						className="mt-1 block w-full p-2 h-48 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-300 resize-none"
					/>
				</div>
				{errors.content_summary && <p>This field is required</p>}
				<div className="flex justify-center">
					<button
						type="submit"
						className="p-2 px-4 bg-violet-700 rounded-xl text-slate-100 hover:bg-violet-800 tracking-wider max-w-[200px]"
					>
						{loading ? "Loading..." : "Submit"}
					</button>
				</div>
				{error && <p>Error creating submission.</p>}
			</form>
		</div>
	);
};

SubmissionForm.propTypes = {
    closeDialog: PropType.func.isRequired,
};

export default SubmissionForm;
