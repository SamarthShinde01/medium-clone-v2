import { Quote } from "../components/Quote";
import { MediumName } from "../components/MediumName";
import { SignUpForm } from "@/components/SignUpForm";

export const Signup = () => {
	return (
		<div className="h-screen grid grid-cols-1 sm:grid-cols-2">
			<div className="flex flex-col justify-center p-4">
				<div className="mb-6 sm:mb-8">
					<MediumName />
				</div>
				<SignUpForm />
			</div>
			<div className="hidden sm:flex justify-center items-center p-4 bg-gray-100">
				<Quote />
			</div>
		</div>
	);
};
