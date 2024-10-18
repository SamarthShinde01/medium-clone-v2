import { Link } from "react-router-dom";
import { AlertTriangleIcon } from "lucide-react";

interface ErrorTypes {
	statusCode?: number;
	message?: string;
}

export const ErrorPageComponent = ({ error }: { error: ErrorTypes }) => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
			<h1 className="text-4xl font-bold text-red-800">
				{error?.statusCode ? error.statusCode : "500"}
			</h1>
			<p className="mt-4 text-red-600">
				{error?.message
					? error.message
					: "Oops! Something went wrong on our end. Please try again later."}
			</p>
			<Link
				to="/"
				className="mt-6 px-4 py-2 bg-blue-600 text-white text-xl rounded hover:bg-blue-700 transition"
			>
				<div className="flex justify-center items-center gap-3">
					<AlertTriangleIcon className="text-xl" />
					Go Back Home
				</div>
			</Link>
		</div>
	);
};
