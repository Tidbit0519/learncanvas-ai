import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import usePersist from "../hooks/usePersist";

import GroqLogo from "../assets/groq-logo-white.png";

const Login = () => {
	const emailRef = useRef(null);
	const pwdRef = useRef(null);
	const [errMsg, setErrMsg] = useState("");
	const [persist, setPersist] = usePersist();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();

	const togglePersist = () => {
		setPersist(!persist);
	};

	useEffect(() => {
		localStorage.setItem("persist", persist);
	}, [persist]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = pwdRef.current.value;

		try {
			const result = await login({ email, password }).unwrap();
			dispatch(setCredentials({ id: result.id, token: result.token }));
			navigate("/");
		} catch (err) {
			if (err.status === 500) {
				setErrMsg("Server error. Please try again later.");
			} else {
				setErrMsg("Invalid user or password.");
			}
		}
	};

	const handleRegister = () => {
		navigate("/signup");
	};

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className="flex justify-center items-center min-h-screen bg-slate-800">
			<div className="w-full max-w-sm p-8 bg-slate-900 rounded-lg shadow-2xl">
				<h1 className="text-xl font-semibold text-center text-slate-100 mb-6">
					Sign in to your account
				</h1>

				{errMsg && (
					<p className="text-red-500 bg-red-200 rounded-md p-2 text-sm text-center mb-4">
						{errMsg}
					</p>
				)}
				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div>
						<label
							htmlFor="email"
							className="block text-md font-medium text-slate-100"
						>
							Email:
						</label>
						<input
							type="text"
							id="email"
							name="email"
							ref={emailRef}
							required
							className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-100"
						/>
					</div>
					<div>
						<label
							htmlFor="pwd"
							className="block text-md font-medium text-slate-100"
						>
							Password:
						</label>
						<input
							type="password"
							id="pwd"
							name="pwd"
							ref={pwdRef}
							required
							className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-100"
						/>
					</div>
					<div className="pt-4">
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-slate-100 bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
						>
							Sign in
						</button>
					</div>
					<div className="flex items-center">
						<input
							type="checkbox"
							id="trust"
							name="trust"
							className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
							onChange={togglePersist}
						/>
						<label
							htmlFor="trust"
							className="ml-2 block text-sm text-slate-100"
						>
							Trust this device
						</label>
					</div>
				</form>

				<div>
					<p className="text-center mt-4 text-slate-100 text-sm pt-2">
						Don&apos;t have an account?{" "}
						<a
							onClick={handleRegister}
							className="text-violet-500 hover:underline"
						>
							Sign up
						</a>
					</p>
				</div>
			<div className="pt-8 flex items-center justify-center gap-4">
				<div className="text-slate-400 text-sm">Powered by</div>
				<img
					className="h-8 w-auto"
					src={GroqLogo}
					alt=""
				/>
			</div>
			</div>
		</div>
	);
};

export default Login;
