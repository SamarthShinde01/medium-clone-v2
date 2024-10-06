import { MediumName } from "../components/MediumName";
import { Quote } from "../components/Quote";
import { SignInForm } from "../components/SignInForm";

export const Signin = () => {
	return (
		<div className="h-screen grid grid-cols-1 sm:grid-cols-2">
			<div>
				<div className="m-2 ml-4">
					<MediumName />
				</div>

				<SignInForm />
			</div>
			<div>
				<Quote />
			</div>
		</div>
	);
};
