import { Outlet, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
	UserCircleIcon,
	ChevronDownIcon,
	ArrowRightIcon,
} from "@heroicons/react/24/outline";
import NavIcon from "../assets/icon-128.png";
import GroqLogo from "../assets/groq-logo-white.png";
import useAuth from "../hooks/useAuth";

const Layout = () => {
	const { firstname } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col max-h-screen">
			<header className="bg-slate-800">
				<nav className="flex items-center justify-between px-4 lg:px-8 py-2">
					<div className="flex lg:flex-1 items-center">
						<a
							href="/"
							className="-m-1.5 p-1.5"
						>
							<img
								className="h-16 w-auto pr-8"
								src={NavIcon}
								alt=""
							/>
						</a>
						<a
							href="/"
							className="hidden lg:block lg:text-md font-bold text-slate-100 uppercase tracking-wider mr-8"
						>
							LearnCanvas AI
						</a>
					</div>
					<div className="flex items-center justify-center gap-4">
						<div className="text-slate-100 text-md">Powered by</div>
						<img
							className="h-8 w-auto"
							src={GroqLogo}
							alt=""
						/>
					</div>
					<div className="flex flex-1 justify-end">
						<Menu>
							<MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm font-semibold text-slate-100 data-[hover]:bg-slate-700 data-[open]:bg-slate-700">
								<UserCircleIcon className="h-8 w-8 text-slate-100" />
								<div className="hidden lg:block font-semibold text-base">
									{firstname}
								</div>
								<ChevronDownIcon className="size-4 text-slate-100" />
							</MenuButton>

							<MenuItems
								transition
								anchor="bottom end"
								className="w-52 origin-top-right rounded-xl border border-slate-600 bg-slate-700 p-1 text-sm font-semibold text-slate-100 transition duration-100 ease-out mt-2"
							>
								<MenuItem>
									<button
										className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-600"
										onClick={() => navigate("/profile")}
									>
										Profile
									</button>
								</MenuItem>
								<div className="my-1 h-px bg-slate-600" />
								<MenuItem>
									<button
										className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-600 justify-between"
										onClick={() => navigate("/login")}
									>
										Log Out
										<ArrowRightIcon className="size-4 fill-white/60" />
									</button>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
				</nav>
			</header>
			<div className="max-w-screen-lg mx-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
