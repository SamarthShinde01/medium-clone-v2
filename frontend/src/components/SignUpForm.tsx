import { Button } from "./Button";
import { FormHeading } from "./FormHeading";
import { Input } from "./Input";
import { Label } from "./Label";

export const SignUpForm = () => {
	return (
		<div className="flex flex-col h-screen justify-center">
			<div className="flex justify-center">
				<div className="w-1/2">
					<FormHeading
						heading="Sign Up"
						link={{
							link: "/signin",
							linkHeading: "Already have an account ? ",
							linkText: "Sign In",
						}}
					/>
					<div className="mt-2 pt-2 flex flex-col">
						<div className="mt-4">
							<Label labelText="Name" />
							<Input placeholder="Enter your name" />
						</div>

						<div className="mt-4">
							<label className="leading-7 font-medium text-sm text-gray-800">
								Email
							</label>
							<Label labelText="Email" />
							<Input type="email" placeholder="Enter your email" />
						</div>

						<div className="mt-4">
							<Label labelText="Password" />
							<Input placeholder="Enter your password" type="password" />
						</div>

						<Button buttonText="Sign Up" />
					</div>
				</div>
			</div>
		</div>
	);
};
