import { MediumName } from "../components/MediumName";
import { Quote } from "../components/Quote";
import { SignInForm } from "../components/SignInForm";

export const Signin = () => {
	return (
		<div className="h-screen grid grid-cols-1 sm:grid-cols-2">
			<div className="flex flex-col justify-center p-4">
				<div className="mb-6 sm:mb-8">
					<MediumName />
				</div>
				<SignInForm />
			</div>
			<div className="hidden sm:flex justify-center items-center p-4 bg-gray-100">
				<Quote />
			</div>
		</div>
	);
};
