import { Quote } from "../components/Quote";
import { MediumName } from "../components/MediumName";
import { SignUpForm } from "@/components/SignUpForm";

export const Signup = () => {
	return (
		<div className="h-screen grid grid-cols-1 sm:grid-cols-2">
			<div>
				<div className="m-2 ml-4">
					<MediumName />
				</div>
				<SignUpForm />
			</div>
			<div>
				<Quote />
			</div>
		</div>
	);
};
