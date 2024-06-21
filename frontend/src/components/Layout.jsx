import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
	Dialog,
	DialogPanel,
	PopoverGroup,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavIcon from "../assets/icon-128.png";

const Layout = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<header className="bg-slate-800">
				<nav className="flex items-center justify-between px-8 py-2">
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
							className="text-sm font-bold text-gray-100 uppercase"
						>
							Canvas Feeder
						</a>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								className="h-6 w-6"
								color="#fff"
							/>
						</button>
					</div>
					<PopoverGroup className="hidden lg:flex lg:gap-x-24">
						<a
							href="#"
							className="text-sm font-semibold leading-6 text-gray-100"
						>
							Submissions
						</a>
						<a
							href="#"
							className="text-sm font-semibold leading-6 text-gray-100"
						>
							Feedbacks
						</a>
					</PopoverGroup>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<a
							href="/login"
							className="text-sm font-semibold leading-6 text-gray-100"
						>
							Log Out <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</nav>
				<Dialog
					className="lg:hidden"
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<div className="fixed inset-0 z-10" />
					<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<a
								href="#"
								className="-m-1.5 p-1.5"
							>
								<span className="sr-only">Your Company</span>
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
									alt=""
								/>
							</a>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Features
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Marketplace
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Company
									</a>
								</div>
								<div className="py-6">
									<a
										href="/login"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Log Out
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
			<div className="max-w-screen-lg mx-auto">
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
