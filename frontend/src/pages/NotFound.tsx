import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "lucide-react";

export const NotFound = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
			<p className="mt-4 text-gray-600">
				Sorry, the page you are looking for does not exist.
			</p>
			<Link
				to="/"
				className="mt-6 px-4 py-2 bg-green-600 text-white text-xl rounded hover:bg-green-700 transition"
			>
				<div className="flex justify-center items-center gap-3">
					<ArrowLeftCircleIcon className="text-xl" />
					Go Back Home
				</div>
			</Link>
		</div>
	);
};
