export const Auth = () => {
	return (
		<div className="flex flex-col h-screen justify-center">
			<div className="flex justify-center">
				<div className="w-1/2">
					<div className="px-10">
						<div className="text-3xl font-extrabold">Sign up with email</div>
						<div className="mt-1 text-slate-400">
							Already have an account?
							<a className="font-semibold underline text-black" href="/signin">
								Sign in
							</a>
						</div>
					</div>
					<div className="mt-2 pt-2 flex flex-col">
						<div className="mt-4">
							<label className="leading-7 font-medium text-sm text-gray-800">
								Name
							</label>
							<input
								type="text"
								placeholder="Enter your name"
								className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>

						<div className="mt-4">
							<label className="leading-7 font-medium text-sm text-gray-800">
								Email
							</label>
							<input
								type="text"
								placeholder="Enter your email"
								className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>

						<div className="mt-4">
							<label className="leading-7 font-medium text-sm text-gray-800">
								Password
							</label>
							<input
								type="password"
								placeholder="Enter your password"
								className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>

						<button
							type="button"
							className="relative inline-block text-lg group mt-8"
						>
							<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
								<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
								<span className="absolute left-0 w-[28rem] h-96 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
								<span className="relative">Sign up</span>
							</span>
							<span
								className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
								data-rounded="rounded-lg"
							></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
