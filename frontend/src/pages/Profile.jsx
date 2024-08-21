import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useUserApi from "../features/user/useUserApi";
import { selectCurrentToken } from "../features/auth/authSlice";
import { styles } from "../utils/styles";

const Profile = () => {
	const token = useSelector(selectCurrentToken);
	const { loading, error, user, getUserById, updateUserById } = useUserApi();
	const [editMode, setEditMode] = useState(false);
	const [successMsg, setSuccessMsg] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const { register, handleSubmit, reset } = useForm();

	useEffect(() => {
		const { id } = token ? jwtDecode(token) : {};
		if (id) {
			getUserById(id);
		}
		return () => {
			reset();
		};
	}, []);
	
	useEffect(() => {
		if (error) {
			setErrorMsg(error);
		}
	}, [error]);

	const toggleEditMode = () => {
		setSuccessMsg(null);
		setErrorMsg(null);
		setEditMode(!editMode);
	};

	const onSubmit = (data) => {
		const { id } = jwtDecode(token);
		if (updateUserById(id, data)) {
			setSuccessMsg("User information updated successfully.");
		}
	};

	return (
		<section className="flex justify-start gap-4 py-8 my-8 mx-4 px-8 bg-slate-900 rounded-2xl h-full flex-col lg:flex-row">
			<UserCircleIcon className="h-32 w-32 text-slate-100" />
			<div className="flex flex-col gap-4 px-4 w-full">
				{successMsg && (
					<div className="flex gap-2 items-center justify-between bg-green-100 rounded-md p-2">
						<p className="text-green-500 text-md text-center">
							{successMsg}
						</p>
						<XMarkIcon
							className="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer"
							onClick={() => setSuccessMsg(null)}
						/>
					</div>
				)}
				{errorMsg && (
					<div className="flex gap-2 items-center justify-between bg-red-100 rounded-md p-2">
						<p className="text-red-500 text-md text-center">
							{errorMsg}
						</p>
						<XMarkIcon
							className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
							onClick={() => setErrorMsg(null)}
						/>
					</div>
				)}
				<h2 className={`${styles.sectionSubText} font-bold`}>
					Personal Information
				</h2>
				{loading ? (
					<p>Loading...</p>
				) : user ? (
					<form
						className="flex flex-col gap-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="lg:flex lg:gap-2 w-full sm:block">
							<EditableField
								label="First Name"
								name="firstname"
								defaultValue={user.firstname}
								editMode={editMode}
								register={register}
							/>
							<EditableField
								label="Last Name"
								name="lastname"
								defaultValue={user.lastname}
								editMode={editMode}
								register={register}
							/>
						</div>
						<EditableField
							label="Email"
							name="email"
							defaultValue={user.email}
							editMode={editMode}
							register={register}
							type="email"
						/>
						<div className="lg:flex lg:gap-2 w-full sm:block">
							{editMode && (
								<EditableField
									label="Current Password"
									name="currentPassword"
									editMode={editMode}
									register={register}
									type="password"
								/>
							)}
							{editMode && (
								<EditableField
									label="New Password"
									name="newPassword"
									editMode={editMode}
									register={register}
									type="password"
								/>
							)}
						</div>
						<div className="mt-auto">
							{" "}
							<div className="flex justify-end gap-4 pt-4">
								{editMode && (
									<button
										type="button"
										onClick={() => toggleEditMode()}
										className="p-3 rounded-xl text-slate-400 hover:text-slate-100 tracking-wider max-w-[200px] text-sm min-w-fit border-slate-400 hover:border-slate-100 border-2"
									>
										Cancel
									</button>
								)}
								{editMode && (
									<button
										type="submit"
										className="p-3 rounded-xl bg-violet-700 text-slate-100 hover:bg-violet-800 tracking-wider max-w-[200px] text-sm min-w-fit"
									>
										Save Changes
									</button>
								)}
								{!editMode && (
									<button
										type="button"
										onClick={() => toggleEditMode()}
										className="p-3 rounded-xl bg-violet-700 text-slate-100 hover:bg-violet-800 tracking-wider max-w-[200px] text-sm min-w-fit"
									>
										Edit Information
									</button>
								)}
							</div>
						</div>
					</form>
				) : (
					<p>No user data available.</p>
				)}
			</div>
		</section>
	);
};

const EditableField = ({
	label,
	name,
	defaultValue,
	editMode,
	register,
	type = "text",
}) => (
	<div className="flex flex-col gap-2 w-1/2">
		<div className="font-semibold">{label}:</div>
		{editMode ? (
			<input
				{...register(name)}
				defaultValue={defaultValue}
				type={type}
				className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-100 w-[300px]"
			/>
		) : (
			<div className="text-slate-400 flex items-center">
				{defaultValue}
			</div>
		)}
	</div>
);

EditableField.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	editMode: PropTypes.bool.isRequired,
	register: PropTypes.func.isRequired,
	type: PropTypes.string,
};

export default Profile;
