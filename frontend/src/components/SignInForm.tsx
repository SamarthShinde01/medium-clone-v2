import { useState } from "react";
import { Button } from "./Button";
import { FormHeading } from "./FormHeading";
import { Input } from "./Input";
import { Label } from "./Label";
import { setCredentials } from "@/slices/authSlice";
import { useSigninMutation } from "@/slices/userApiSlices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";

export const SignInForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [signin, { isLoading }] = useSigninMutation();

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (!username || !password) {
				toast.warning("Please enter valid fields");
				return;
			}

			const res = await signin({ username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("Signed in successfully");
			navigate("/");
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err?.message);
				toast.error(err?.message);
			}
		}
	};

	return (
		<div className="flex flex-col justify-center h-screen px-4 sm:px-6 lg:px-8">
			<div className="flex justify-center">
				<div className="w-full max-w-md">
					<FormHeading
						heading="Sign In"
						link={{
							link: "/signup",
							linkHeading: "Don't have an account?",
							linkText: "Sign Up",
						}}
					/>
					<form onSubmit={submitHandler}>
						<div className="mt-4 flex flex-col space-y-4">
							<div>
								<Label labelText="Email" />
								<Input
									type="email"
									placeholder="Enter your email"
									onChange={setUsername}
								/>
							</div>

							<div>
								<Label labelText="Password" />
								<Input
									type="password"
									placeholder="Enter your password"
									onChange={setPassword}
								/>
							</div>

							<div>
								{isLoading ? (
									<Spinner />
								) : (
									<Button buttonText="Sign In" type="submit" />
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
