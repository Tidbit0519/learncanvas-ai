import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, connect } from "react-redux";
import { registerCredentials } from "../features/auth/authSlice";
import { useSignupMutation } from "../features/auth/authApiSlice";

const Signup = () => {
	const [successMsg, setSuccessMsg] = useState(false);
	const [errMsg, setErrMsg] = useState(false);
	const [timer, setTimer] = useState(0);

	const { register, handleSubmit } = useForm(
		{ defaultValues: { firstname: "", lastname: "", email: "", password: "" } }
	);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [signup, { isLoading }] = useSignupMutation();

	useEffect(() => {
		if (timer > 0 && successMsg) {
			const intervalId = setInterval(() => {
				setTimer((seconds) => seconds - 1);
			}, 1000);

			return () => clearInterval(intervalId);
		}
		if (timer === 0 && successMsg) {
			navigate("/login");
		}

	}, [timer]);

	const onSubmit = async (data) => {
		try {
			const result = await signup(data).unwrap();
			dispatch(registerCredentials({ ...data }));
			if (result) {
				setTimer(5);
				setErrMsg(false);
				setSuccessMsg(true);
			}
		} catch (err) {
			if (err.status === 500) {
				setErrMsg("Server error. Please try again later.");
			} else {
				setErrMsg("User with this email already exists.");
			}
		}
	};

	const handleLogin = () => {
		setSuccessMsg(false);
		setErrMsg(false);
		navigate("/login");
	};

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className="flex justify-center items-center min-h-screen bg-slate-800">
			<div className="w-full max-w-sm p-8 bg-slate-900 rounded-lg shadow-2xl">
				<h1 className="text-xl font-semibold text-center text-slate-100 mb-6">
					Register for an account
				</h1>

				{errMsg && (
					<div
						className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
						role="alert"
					>
						<strong className="font-bold">Error: </strong>
						<span className="block sm:inline">{errMsg}</span>
					</div>
				)}

				{successMsg && (
					<div
						className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
						role="alert"
					>
						<strong className="font-bold">Success: </strong>
							<span className="block sm:inline">{successMsg}</span>
							<span className="block sm:inline">Redirecting to login in {timer} seconds...</span>
					</div>
				)}

				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
						<label
							htmlFor="firstname"
							className="block text-slate-100 text-md font-medium"
						>
							First Name:
						</label>
						<input
							type="firstname"
							id="firstname"
							name="firstname"
							className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-100"
							{...register("firstname", { required: true })}
						/>
						<label
							htmlFor="lastname"
							className="block text-slate-100 text-md font-medium"
						>
							Last Name:
						</label>
						<input
							type="lastname"
							id="lastname"
							name="lastname"
							className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-100"
							{...register("lastname", { required: true })}
						/>
						<label
							htmlFor="lastname"
							className="block text-slate-100 text-md font-medium"
						>
							Email:
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-100"
							{...register("email", { required: true })}
						/>
						<label
							htmlFor="password"
							className="block text-slate-100 text-md font-medium"
						>
							Password:
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-100"
							{...register("password", { required: true })}
						/>
					<div className="pt-4">
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
						>
							Register
						</button>
					</div>
				</form>
				<div className="text-center mt-4 text-slate-100 text-sm">
					Already have an account?{" "}
					<a
						onClick={handleLogin}
						className="text-violet-500 hover:underline"
					>
						Log in
					</a>
				</div>
			</div>
		</div>
	);
};

connect(({ email, firstname, lastname, canvasToken }) => ({ email, firstname, lastname, canvasToken }), { registerCredentials })(Signup);
export default Signup;
