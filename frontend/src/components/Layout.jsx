import { Outlet } from "react-router-dom";
import NavIcon from "../assets/icon-128.png";

const Layout = () => {
	return (
		<>
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
							className="hidden lg:text-md font-bold text-gray-100 uppercase tracking-wider"
						>
							LearnCanvas AI
						</a>
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<a
							href="/login"
							className="text-sm font-semibold leading-6 text-gray-100"
						>
							Log Out <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</nav>
			</header>
			<div className="max-w-screen-lg mx-auto">
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
